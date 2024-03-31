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
  cardRound: Card[]
  currentRule: string[]
  adversary: Socket
  myTurn: boolean

  constructor(socket: Socket, status: string) {
    this.socket = socket
    this.status = status
    this.roomId = ''
    this.deck = {} as DeckPros
    this.cards = {} as Card[]
    this.cardRound = {} as Card[]
    this.currentRule = []
    this.adversary = {} as Socket
    this.myTurn = false
  }

  playerOfTheMoment() {
    this.socket.emit('yourTime', false)
    this.adversary.emit('yourTime', true)
  }

  checkSuit(card: Card[]) {
    console.log(this.cardRound)
    return card[0].suit === this.cardRound[0].suit
  }

  checkCards() {
    return this.cards.some((card) => card.suit === this.cardRound[0].suit)
  }

  checkMove() {
    if (!this.myTurn) {
      return false
    }

    return true
  }

  sendCard() {
    this.playerOfTheMoment
    this.socket.emit('cardPlayer', this.cards)
  }

  lookingFor() {
    this.updateStatus('lookingFor')

    console.log('id', this.socket.id)
  }

  setRoomId(roomId: string) {
    this.roomId = roomId
  }

  setDeck(deckId: DeckPros) {
    this.deck = deckId
  }

  setCards(cards: Card[]) {
    this.cards = cards
  }

  setCardRound(cardRound: Card[]) {
    this.cardRound = cardRound
  }

  updateStatus(status: string) {
    this.status = status
  }
}
