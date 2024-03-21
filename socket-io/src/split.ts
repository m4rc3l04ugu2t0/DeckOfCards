import { draw } from './draw'
import { shuffle } from './shuffler'

export const split = async () => {
  const deck = await shuffle()
  const cardsSplit = await draw(deck.deck_id)
  return cardsSplit
}
