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
