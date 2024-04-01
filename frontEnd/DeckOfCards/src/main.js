import './style.css'

import { io } from 'socket.io-client'

import { player2 } from './players/player2'
import { cardCurrent, moveCard, removeDragAndDrop } from './functions/moveCard'

const dropzone = document.querySelector('.dropzone')
const play = document.getElementById('play')
const screen = document.getElementById('screen')

export let sessionGame
export let cards
export let player
let onlines
export let myTurn
let playCount

export const socket = io('http://localhost:3000')

import './style.css'
socket.on('playing', (message) => {
  sendMessageServer('sendMessageRoom', message)
})

socket.on('playerDisconnected', (message) => {
  alert(message)
  document.getElementById('restCards').textContent = '0'
  document.getElementById('pile').innerHTML = `
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46 absolute  -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
  `
  screen.classList.remove('hidden')
  player2()
})

socket.on('newMessage', (message) => {
  sessionGame = message
})

socket.on('updateRestCards', (message) => {
  console.log(message)
  document.getElementById('restCards').textContent = message.remaining
})

socket.on('cardInitial', (message) => {
  document.getElementById('pile').innerHTML = `
  <img src="${message[0].image}" alt="Carta Inicial" class="card w-36 h-46 order-2">
  `
})

socket.on('cardPlayer', (message) => {
  player2(message)
  console.log('cards', message)
  cards = message
})

socket.on('yourTime', (message) => {
  console.log(message)
  myTurn = message.myTurn
  playCount = message.playCount
  if (myTurn) {
    document.getElementById('myTurn').textContent = 'Sua Vez'
    moveCard()
  } else {
    removeDragAndDrop()
    document.getElementById('myTurn').textContent = 'Vez do oponente'
  }
})

socket.on('alert', (message) => {
  alert(message)
})

socket.on('inforPlayer', (message) => {
  console.log('skssjsj', message)
  myTurn = message.myTurn
  playCount = message.playCount

  if (message.myTurn) {
    moveCard()
    message.myTurn = 'Sua vez'
  } else {
    message.myTurn = 'Vez do oponente'
  }
  document.getElementById('infor').innerHTML = `
            <h2 class="font-semibold text-2xl  max-[760px]:text-sm ">Informações da partida</h2>
            <p class="font-normal text-xl max-[760px]:text-sm ">Cartas no baralho: <span id="restCards">0</span></p>
            <p class="font-normal text-xl max-[760px]:text-sm ">Rodada atual: <span id="myTurn">${message.myTurn}</span></p>
            <p class="font-normal text-xl max-[760px]:text-sm ">Sua pontuação: <span id="points">0</span></p>
            <p class="font-normal text-xl max-[760px]:text-sm ">Oponente: <span>0</span></p>
  `
})

socket.on('counterattack', (message) => {
  const cardsDropzone = document.querySelector('.dropzone')
  console.log(message)

  if (typeof message === 'string') {
    alert(message)
    return
  }

  cardsDropzone.innerHTML += `<img src="${message[0].image}" alt="Card" class="card w-36 h-46" />`
})

socket.on('cardsInvalid', (message) => {
  const images = []

  message.cardsRound.map((card) => {
    images.push(
      `<img src="${card.image}" alt="card image"  class="card  w-36 h-46">`
    )
  })

  document.getElementById('pile').innerHTML = images.join('')

  console.log(message)
})

socket.on('updateCards', (message) => {
  cards = message
  player2(message)
})

export const sendMessageServer = (type, contentMsg) => {
  console.log('play')
  socket.emit('game', player)
  socket.emit(type, contentMsg)
}

dropzone?.addEventListener('drop', (e) => {
  e.preventDefault()

  if (!myTurn) return

  console.log(cardCurrent)

  const card = cards.cards.filter((card) => {
    return card.image === cardCurrent.src
  })

  cards = cards.cards.filter((cardFilter) => {
    return cardFilter.image !== card.image
  })

  sendMessageServer('playedCard', { sessionGame, myTurn, card })
})

socket.on('playersOnline', (message) => {
  onlines = message
  document.getElementById('onlines').textContent = message
})

play.onclick = function lookingForCorrespondence() {
  if (onlines <= 1) return alert('players onlines insuficiente')
  socket.emit('lookingFor', player)
  screen.classList.add('hidden')
  console.log('aaaaaaaaaaaaaaaaah')
}
