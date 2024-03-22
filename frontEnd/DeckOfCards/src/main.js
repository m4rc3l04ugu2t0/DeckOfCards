import './style.css'

import { connectionSocket } from './socket'
import { player2 } from './players/player2'

const socket = connectionSocket()
let player
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
  player2()
})

socket.on('newMessage', (message) => {
  console.log(message)
})

socket.on('cardPlayer', (message) => {
  player2(message)
})

const sendMessageServer = (type, contentMsg) => {
  console.log('play')
  socket.emit('game', player)
  socket.emit(type, contentMsg)
}

document.getElementById('play').onclick = function lookingForCorrespondence() {
  if (onlines <= 1) return alert('players onlines insuficiente')
  sendMessageServer('lookingFor', player)
}
