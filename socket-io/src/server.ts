import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { split } from './split'

const app = express()
const server = createServer(app)
export const socketIo = new Server(server, {
  cors: {
    origin: '*'
  }
})

interface Player {
  id: string
  socket: Socket
  status: string
}

interface SessionGameProps {
  [key: string]: Socket[]
}

let players: Player[] = []
const sessionGame: SessionGameProps = {}

socketIo.on('connection', (socket) => {
  console.log('connected')

  players.push({
    id: socket.id,
    socket,
    status: 'online'
  })

  socket.on('disconnect', () => {
    console.log('disconnected')
    players = players.filter((player) => player.id !== socket.id)
  })

  socket.on('lookingFor', (message) => {
    console.log('lookingFor', message)
    lookingFor(socket)
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
})

async function lookingFor(player: Socket) {
  updateStatus(player.id, 'lookingFor')
  let playersLookingFor = players.filter(
    (player) => player.status === 'lookingFor'
  )

  if (playersLookingFor.length <= 1) return

  const roomId: string = playersLookingFor[0].id + playersLookingFor[1].id

  sessionGame[roomId] = [
    playersLookingFor[0].socket,
    playersLookingFor[1].socket
  ]

  playersLookingFor[0].socket.join(roomId)
  playersLookingFor[1].socket.join(roomId)

  playersLookingFor[0].socket.emit('playing', roomId)
  playersLookingFor[1].socket.emit('playing', roomId)

  updateStatus(playersLookingFor[0].socket.id, 'playing')
  updateStatus(playersLookingFor[1].socket.id, 'playing')

  const cards1 = await split()
  const cards2 = await split()

  playersLookingFor[0].socket.emit('cardPlayer', cards1)
  playersLookingFor[1].socket.emit('cardPlayer', cards2)

  playersLookingFor = []
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
