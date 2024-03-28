import { io } from 'socket.io-client'

export let sessionGame
export let cards
export let player


export const socket = io('http://localhost:3000')
