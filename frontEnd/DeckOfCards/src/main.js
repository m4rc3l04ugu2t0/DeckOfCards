import { player1 } from './players/player1'
import { player2 } from './players/player2'
import './style.css'

const webSocket = new WebSocket('ws://localhost:3000')

webSocket.onopen = handleSocketOpen
webSocket.onmessage = handleSocketMessage

function handleSocketOpen() {
  console.log('connected')
  webSocket.send('cliet')
}

function handleSocketMessage({ data }) {
  console.log(data)
}

player1()
player2()
