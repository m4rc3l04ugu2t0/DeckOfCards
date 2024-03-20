import express from 'express'
import http from 'http'
import { WebSocket } from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

server.listen(3000, () => {
  console.log('http://localhost:3000')
})

let players = []
console.log(players)

wss.on('connection', (ws, req) => {
  const userId = req.headers['sec-websocket-key']

  players.push({
    userId,
    status: 'online',
    totalUsers: wss.clients.size,
    message: 'players'
  })

  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ action: 'players', players }))
  })

  ws.on('message', (msg) => {
    console.log(msg.toString())
  })

  ws.on('close', () => {
    players = players.filter((player) => player.userId !== userId)

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ action: 'all', players }))
      }
    })
  })

  // sendMessageUser(userId, userId)
})

function sendMessageUser(userId: number, message: string) {
  const user = players[userId]

  if (user && user.readyState === WebSocket.OPEN) {
    user.send(
      JSON.stringify({
        userId,
        status: 'online',
        totalUsers: wss.clients.size,
        message: 'single'
      })
    )
  }
}
