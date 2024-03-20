import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const socketIo = new Server(server, {
  cors: {
    origin: '*'
  }
})

socketIo.on('connection', (socket) => {
  console.log('connected')

  socket.on('disconnect', () => {
    console.log('disconncted')
  })

  socket.on('play', (message) => {
    // socketIo.emit('play', 'server')
    socket.broadcast.emit('play', 'playing...')
    console.log('playing', message)
  })
})

server.listen(3000, () => {
  console.log('server running')
})
