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

export interface Card {
  code: string
  image: string
  images: {
    svg: string
    png: string
  }
  value: number
  suit: string
}

interface ApiResponse {
  success: boolean
  deck_id: string
  cards: Card[]
  remaining: number
  playerId: number
}

export class PlayerRules {
  socket: Socket
  status: string
  deck: DeckPros
  roomId: string
  cards: ApiResponse
  cardRound: Card[]
  currentRule: string[]
  adversary: Socket
  myTurn: boolean
  playCards: Card[]
  playCount: number

  constructor(socket: Socket, status: string) {
    this.socket = socket
    this.status = status
    this.roomId = ''
    this.deck = {} as DeckPros
    this.cards = {} as ApiResponse
    this.cardRound = {} as Card[]
    this.currentRule = []
    this.adversary = {} as Socket
    this.myTurn = false
    this.playCount = 0
    this.playCards = []
  }

  playerOfTheMoment() {
    this.myTurn = false
    this.playCount = 1
    this.adversary.rules.myTurn = true
    this.adversary.rules.playCount = 0
    this.socket.emit('yourTime', { myTurn: false, playCount: 1 })
    this.adversary.emit('yourTime', { myTurn: true, playCount: 0 })
  }

  checkSuit(card: Card[]) {
    console.log(this.cardRound)
    return card[0].suit === this.cardRound[0].suit
  }

  checkCards() {
    return this.cards.cards.some((card) => card.suit === this.cardRound[0].suit)
  }

  checkMove() {
    if (!this.myTurn && this.playCount > 0) {
      return false
    }

    return true
  }

  sendCard() {
    this.socket.emit('cardPlayer', this.cards)
  }

  lookingFor() {
    this.updateStatus('lookingFor')
  }

  setRoomId(roomId: string) {
    this.roomId = roomId
  }

  setDeck(deckId: DeckPros) {
    this.deck = deckId
  }

  setCards(cards: ApiResponse) {
    this.cards = cards
  }

  setCardRound(cardRound: Card[]) {
    this.playCards.push(cardRound[0])
    this.cardRound = cardRound
  }

  updateCards(receviedCard: Card[]) {
    console.log('sekkkdkkd', receviedCard)

    const cardsUpdated = this.cards.cards.filter(
      (card) => card.image !== receviedCard[0].image
    )
    this.cards.cards = cardsUpdated
  }

  updateStatus(status: string) {
    this.status = status
  }
}
