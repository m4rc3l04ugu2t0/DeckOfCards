import './style.css'

import { socket } from './connect.js'
import { sendMessageServer } from "./functions/sendMessageServer"

let onlines

socket.on('playersOnline', (message) => {
  onlines = message
  document.getElementById('onlines').textContent = message
})

document?.getElementById('play').onclick = function lookingForCorrespondence() {
  if (onlines <= 1) return alert('players onlines insuficiente')
  window.location.href = '../game.html'
  sendMessageServer('lookingFor', player)
  console.log('aaaaaaaaaaaaaaaaah')
}
