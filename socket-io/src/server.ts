import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { shuffle } from './shuffler'
import { draw } from './draw'
import { rest } from './rest'
import { PlayerRules } from './player'

const app = express()
const server = createServer(app)
export const socketIo = new Server(server, {
  cors: {
    origin: '*'
  }
})

declare module 'socket.io' {
  interface Socket {
    rules: PlayerRules
  }
}

interface Player {
  id: string
  socket: Socket
  status: string
}

interface SessionGameProps {
  [key: string]: Socket[]
}

export let players: Player[] = []
export const sessionGame: SessionGameProps = {}

export let deck: {
  success: boolean
  deck_id: string
  shuffled: boolean
  remaining: number
}

socketIo.on('connection', (socket: Socket) => {
  console.log('connected')

  players.push({
    id: socket.id,
    socket,
    status: 'online'
  })

  const playerRules = new PlayerRules(socket, 'online')

  socket.rules = playerRules

  socketIo.emit('playersOnline', socketIo.engine.clientsCount)

  socket.on('disconnect', () => {
    console.log('disconnected')
    socketIo.emit('playersOnline', socketIo.engine.clientsCount)
    const roomId = Object.keys(sessionGame).find((key) =>
      key.includes(socket.id)
    )

    if (roomId) {
      const playerRemoveRoom = sessionGame[roomId].find(
        (player) => player.id !== socket.id
      )

      socket.leave(roomId)
      socketIo
        .to(roomId)
        .emit('playerDisconnected', 'Seu oponente abandonou o game KKKKKKKK')
      playerRemoveRoom?.leave(roomId)
    }

    players = players.filter((player) => player.id !== socket.id)
  })

  socket.on('playedCard', (message) => {
    socket.rules.myTurn = message.myTurn
    console.log('ooooooooooooo', socket.rules.myTurn, socket.id)
    if (!socket.rules.checkMove()) {
      socket.emit('alert', 'Não é a sua vez')
      return
    }

    if (!socket.rules.checkCards) {
      socket.emit('alert', 'Restire uma carta do baralho')
      return
    }

    if (!socket.rules.checkSuit(message.card)) {
      socket.emit(
        'alert',
        'Jogue uma carta de mesmo simbolo, ou duas cartas de mesmo valor'
      )
      socket.emit('cardsInvalid', socket.rules.cards)
      return
    }
    socket.broadcast.to(message.sessionGame).emit('counterattack', message.card)
    socket.rules.playerOfTheMoment()
    socket.rules.myTurn = false
    console.log('lsslsllsl', message)
  })

  socket.on('lookingFor', async (message) => {
    console.log('lookingFor', message)

    const resultLookingFor = await lookingFor(socket)
    const roomId = Object.keys(sessionGame).find((key) =>
      key.includes(socket.id)
    )

    if (resultLookingFor && roomId) {
      const cardsRest = await rest(deck.deck_id)
      console.log(cardsRest)
      socketIo.to(roomId).emit('updateRestCards', cardsRest)
    }
  })

  socket.on('sendMessageRoom', (roomId: string) => {
    console.log('roomID ', roomId)
    const salas = socketIo.sockets.adapter.rooms
    console.log('Salas e usuários nelas:')
    salas.forEach((usuarios, salaId) => {
      console.log(`Sala ${salaId}:`)
      usuarios.forEach((usuarioId) => {
        console.log(`- Usuário ${usuarioId}`)
      })
    })

    socketIo.to(roomId).emit('newMessage', roomId)
  })

  socket.on('moveCard', (message) => {
    console.log('move', message)
  })
})

async function lookingFor(player: Socket) {
  updateStatus(player.id, 'lookingFor')
  player.rules.updateStatus('lookingFor')
  let playersLookingFor = players.filter(
    (player) => player.status === 'lookingFor'
  )

  if (playersLookingFor.length <= 1) return

  const roomId: string = playersLookingFor[0].id + playersLookingFor[1].id

  playersLookingFor[0].socket.rules.setRoomId(roomId)
  playersLookingFor[1].socket.rules.setRoomId(roomId)

  deck = await shuffle()

  playersLookingFor[0].socket.rules.setDeck(deck)
  playersLookingFor[1].socket.rules.setDeck(deck)

  console.log(deck)
  sessionGame[roomId] = [
    playersLookingFor[0].socket,
    playersLookingFor[1].socket
  ]

  playersLookingFor[0].socket.join(roomId)
  playersLookingFor[1].socket.join(roomId)

  playersLookingFor[0].socket.rules.adversary = playersLookingFor[1].socket
  playersLookingFor[1].socket.rules.adversary = playersLookingFor[0].socket

  playersLookingFor[0].socket.emit('playing', roomId)
  playersLookingFor[1].socket.emit('playing', roomId)

  updateStatus(playersLookingFor[0].socket.id, 'playing')
  updateStatus(playersLookingFor[1].socket.id, 'playing')

  playersLookingFor[0].socket.rules.updateStatus('playing')
  playersLookingFor[0].socket.rules.updateStatus('playing')

  const cards1 = await draw(deck.deck_id, '9')
  const cards2 = await draw(deck.deck_id, '9')
  const cardInitial = await draw(deck.deck_id, '1')

  playersLookingFor[0].socket.rules.setCards(cards1)
  playersLookingFor[1].socket.rules.setCards(cards2)

  playersLookingFor[0].socket.rules.setCardRound(cardInitial.cards)
  playersLookingFor[1].socket.rules.setCardRound(cardInitial.cards)

  socketIo.to(roomId).emit('cardInitial', cardInitial.cards)

  playersLookingFor[0].socket.rules.sendCard()
  playersLookingFor[1].socket.rules.sendCard()

  playersLookingFor[0].socket.rules.myTurn = true
  playersLookingFor[1].socket.rules.myTurn = false

  updateStatus(playersLookingFor[0].socket.id, 'playing')
  updateStatus(playersLookingFor[1].socket.id, 'playing')

  playersLookingFor[0].socket.emit('inforPlayer', {
    myTurn: true,
    cardsRest: 0
  })

  playersLookingFor[1].socket.emit('inforPlayer', {
    myTurn: false,
    cardsRest: 0
  })

  playersLookingFor = []
  return true
}

function updateStatus(playerId: string, status: string) {
  players = players.map((player: Player) => {
    if (player.id === playerId) {
      return { ...player, status }
    } else {
      return player
    }
  })
}

server.listen(3000, () => {
  console.log('server running')
})
