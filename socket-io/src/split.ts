import { draw } from './draw'

export const split = async (deck_id: string, count: string) => {
  const cardsSplit = await draw(deck_id, count)

  return cardsSplit
}
