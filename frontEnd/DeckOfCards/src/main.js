import './style.css'

import { connectionSocket } from './socket'
import { player2 } from './players/player2'

const socket = connectionSocket()
let player

socket.on('playing', (message) => {
  sendMessageServer('sendMessageRoom', message)
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
  sendMessageServer('lookingFor', player)
}
