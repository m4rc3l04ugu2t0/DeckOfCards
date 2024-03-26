interface Card {
    code: string;
    image: string;
    images: {
        svg: string;
        png: string;
    };
    value: string;
    suit: string;
}

interface ApiResponse {
    success: boolean;
    deck_id: string;
    cards: Card[];
    remaining: number;
    playerId: number
}

interface MoveCardPlayer {
  [key: string]: number;
}


export class RulesGame {

  player1: ApiResponse
  player2: ApiResponse
  cardTiebreaker: ApiResponse
  cardsH: string[]
  movePlayer: MoveCardPlayer

  constructor() {
    this.player1 = {} as ApiResponse
    this.player2 = {} as ApiResponse
    this.movePlayer = {} as MoveCardPlayer
    this.cardTiebreaker = {} as ApiResponse

    //this.playerdCurrent = []

    this.cardsH = ['AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'KH', 'QH', 'JH']
  }

  startGame(player1: ApiResponse, player2: ApiResponse, cardTiebreaker: ApiResponse) {
    this.player1 = player1
    this.player2 = player2
    this.cardTiebreaker = cardTiebreaker
  }


  initialSituation(code: string, player: string) {
    // this.cardTiebreaker.cards[0].code !== card.match(/\/([^/]+)\.png$/)?.[1]
    const valueInitial = this.cardTiebreaker.cards[0].code[1]
    let winning
    console.log(this.cardTiebreaker.cards[0].value)

    
    if (!this.cardTiebreaker.cards[0].code.includes(code[1])) {
      return 'Movimento invalido!'
    }

    const difference: number = +Math.abs(Number(this.cardTiebreaker.cards[0].value) - Number(code[1]))
    console.log(difference)

    return 'ok'
  }  

  

}
