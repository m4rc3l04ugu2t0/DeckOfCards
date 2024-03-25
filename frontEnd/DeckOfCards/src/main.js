import './style.css'

import { player2 } from './players/player2'
import { moveCard } from './functions/moveCard'
import { io } from 'socket.io-client'

const connectionSocket = () => io('http://localhost:3000')
export const socket = connectionSocket()
export let player
export let sessionGame
let onlines

socket.on('playing', (message) => {
  sendMessageServer('sendMessageRoom', message)
})

socket.on('playersOnline', (message) => {
  onlines = message
  document.getElementById('onlines').textContent = message
})

socket.on('playerDisconnected', (message) => {
  alert(message)
  document.getElementById('restCards').textContent = '0'
  document.getElementById('pile').innerHTML = `
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46 absolute  -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
  `
  player2()
})

socket.on('newMessage', (message) => {
  sessionGame = message
})

socket.on('updateRestCards', (message) => {
  console.log(message)
  document.getElementById('restCards').textContent = message.remaining
})

socket.on('cardPlayer', (message) => {
  player2(message)
  console.log(message)
  document.getElementById('pile').innerHTML = `
  <img src="${message.cardInitial.cards[0].image}" alt="Carta Inicial" class="card w-36 h-46 order-2">
  `
  document.getElementById('restCards').textContent = message.remaining
  moveCard()
})

const sendMessageServer = (type, contentMsg) => {
  console.log('play')
  socket.emit('game', player)
  socket.emit(type, contentMsg)
}

const dropzone = document.querySelector('.dropzone')
dropzone.addEventListener('drop', (e) => {
  e.preventDefault()
  const cardsDropzone = document.querySelectorAll('.dropzone .card')
  cardsDropzone.filter((card) => return card)
})

document.getElementById('play').onclick = function lookingForCorrespondence() {
  if (onlines <= 1) return alert('players onlines insuficiente')
  sendMessageServer('lookingFor', player)
  console.log('aaaaaaaaaaaaaaaaah')
}
