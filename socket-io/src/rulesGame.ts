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

interface ApiResponse {
  success: boolean
  deck_id: string
  cards: Card[]
  remaining: number
  playerId: number
}

interface DataGame {
  [key: string]: {
    points: number
    totalCards: number
    totalMove: number
  }
}

export class RulesGame {
  player1: ApiResponse
  player2: ApiResponse
  cardTiebreaker: Card[]
  cardsH: string[]
  movePlayer: DataGame
  moves: number

  constructor() {
    this.player1 = {} as ApiResponse
    this.player2 = {} as ApiResponse
    this.movePlayer = {} as DataGame

    this.cardTiebreaker = []
    this.moves = 0
    //this.playerdCurrent = []

    this.cardsH = [
      'AH',
      '2H',
      '3H',
      '4H',
      '5H',
      '6H',
      '7H',
      '8H',
      '9H',
      '0H',
      'KH',
      'QH',
      'JH'
    ]
  }

  startGame(
    player1: ApiResponse,
    player2: ApiResponse,
    cardTiebreaker: Card[]
  ) {
    this.player1 = player1
    this.player2 = player2
    this.cardTiebreaker = cardTiebreaker
    this.movePlayer[player1.playerId] = {
      totalMove: 0,
      totalCards: player1.cards.length,
      points: 0
    }
    this.movePlayer[player2.playerId] = {
      totalMove: 0,
      totalCards: player2.cards.length,
      points: 0
    }
  }

  checkValue(type: string) {
    const values: { [key: string]: number } = {
      KING: 100,
      QUEEN: 90,
      JACK: 80
    }

    if (values[type]) return values[type]

    return Number(type)
  }

  difference(cardValue1: number, cardValue2: number) {
    return Math.abs(cardValue1 - cardValue2)
  }

  initialSituation(card: Card[], player: string) {
    if (this.movePlayer[player].totalMove >= 1) {
      return 'voce ja jogo'
    }

    if (this.cardTiebreaker[0].suit === card[0].suit) {
      this.movePlayer[player].totalMove = 1
      this.movePlayer[player].points = this.difference(
        this.checkValue(this.cardTiebreaker[0].value.toString()),
        this.checkValue(card[0].value.toString())
      )
      return 'ta'
    }

    //    const difference = +Math.abs(Number(this.cardTiebreaker.cards[0].value) - Number(code[1]))
    //  console.log(difference)
    return 'invalido'
  }

  console() {
    return console.log(this.movePlayer)
  }
}
