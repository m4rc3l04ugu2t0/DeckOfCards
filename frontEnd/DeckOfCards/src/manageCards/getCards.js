import { draw } from '../services/draw'
import { shuffle } from '../services/shuffle'

export const getCards = async () => {
  const deck = await shuffle()
  const cads = await draw(deck.deck_id)
  return cads
}
