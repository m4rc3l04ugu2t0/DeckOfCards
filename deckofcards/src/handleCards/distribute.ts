import { drawCards } from './drawCards'
import { shuffle } from './shuffle'

export const distributeCards = async () => {
  const deckOfCard = await shuffle()

  if (!deckOfCard) return

  const cards = await drawCards(deckOfCard.deck_id)

  if (!cards) return

  return cards.cards
}
