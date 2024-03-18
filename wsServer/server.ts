import express from 'express'
import http from 'http'
import { WebSocket } from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

server.listen(3000, () => {
  console.log('http://localhost:3000')
})

const players: WebSocket[] = []

wss.on('connection', (ws) => {
  players.push(ws)

  ws.on('message', (msg) => {
    console.log(msg.toString())
  })
  ws.send('ou')

  ws.on('close', () => {
    console.log('desconected')

    const index = players.indexOf(ws)
    if (index !== -1) {
      players.splice(index, 1)
    }
  })
})
