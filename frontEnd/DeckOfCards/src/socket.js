import { io } from 'socket.io-client'

export const connectionSocket = () => io('http://localhost:3000')
// const socket = connectionSocket()

// socket.on('play', (message) => {
//   console.log('message received: ' + message)
// })

// const sendMessageServer = () => {
//   socket.emit('play', 'client')
// }

// sendMessageServer()

// console.log('io')
