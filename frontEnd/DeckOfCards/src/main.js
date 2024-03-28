import './style.css'

import { socket } from './connect'
import { player2 } from './players/player2'
import { cardCurrent, moveCard } from './functions/moveCard'
import { sendMessageServer } from './functions/sendMessageServer'

const dropzone = document.querySelector('.dropzone')

export let player
export let sessionGame
let cards

socket.on('playing', (message) => {
  sendMessageServer('sendMessageRoom', message)
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
  console.log('cards', message)
  cards = message
  document.getElementById('pile').innerHTML = `
  <img src="${message.cardInitial.cards[0].image}" alt="Carta Inicial" class="card w-36 h-46 order-2">
  `
  document.getElementById('restCards').textContent = message.remaining
  moveCard()
})

socket.on('counterattack', (message) => {
  console.log(message)

  const cardsDropzone = document.querySelector('.dropzone')
  cardsDropzone.innerHTML += `<img src="${message}" alt="Card" class="card w-36 h-46" />`
})


dropzone?.addEventListener('drop', (e) => {
  e.preventDefault()

  const card = cards.cards.filter((card) => {
    return card.image === cardCurrent.src
  })

  sendMessageServer('playedCard', { sessionGame, card })
})

