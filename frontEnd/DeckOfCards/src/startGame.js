import './style.css'

import { socket, player } from './connect.js'

let onlines

socket.on('playersOnline', (message) => {
  onlines = message
  document.getElementById('onlines').textContent = message
})

document.getElementById('play').onclick = function lookingForCorrespondence() {
  if (onlines <= 1) return alert('players onlines insuficiente')
  socket.emit('lookingFor', player)
  console.log('aaaaaaaaaaaaaaaaah')
}
