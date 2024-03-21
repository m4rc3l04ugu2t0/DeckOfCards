import './style.css'

import { connectionSocket } from './socket'

const socket = connectionSocket()
let player

socket.on('playing', (message) => {
  console.log(message)
  sendMessageServer('sendMessageRoom', message)
})

socket.on('newMessage', (message) => {
  console.log(message)
})

const sendMessageServer = (type, contentMsg) => {
  console.log('play')
  socket.emit('game', player)
  socket.emit(type, contentMsg)
}

document.getElementById('play').onclick = function lookingForCorrespondence() {
  sendMessageServer('lookingFor', player)
}
