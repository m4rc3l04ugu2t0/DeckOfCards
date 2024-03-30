import { Socket } from 'socket.io'

interface SessionGameProps {
  [key: string]: Socket[]
}

interface DeckPros {
  success: boolean
  deck_id: string
  shuffled: boolean
  remaining: number
}

export const sessionGame: SessionGameProps = {}

interface Card {
  code: string
  image: string
  images: {
    svg: string
    png: string
  }
  value: number
  suit: string
}

export class PlayerRules {
  socket: Socket
  status: string
  deck: DeckPros
  roomId: string
  cards: Card[]
  cardInitial: Card[]

  constructor(socket: Socket, status: string) {
    this.socket = socket
    this.status = status
    this.roomId = ''
    this.deck = {} as DeckPros
    this.cards = {} as Card[]
    this.cardInitial = {} as Card[]
  }

  sendCard() {
    this.socket.emit('cardPlayer', this.cards)
  }

  lookingFor() {
    this.updateStatus('lookingFor')

    console.log(this.socket.id)
  }

  setRoomId(roomId: string) {
    this.roomId = roomId
  }

  setDeck(deckId: DeckPros) {
    this.deck = deckId
  }

  setCards(cards: Card[], cardInitial: Card[]) {
    this.cardInitial = cardInitial
    this.cards = cards
  }

  updateStatus(status: string) {
    this.status = status
  }
}
