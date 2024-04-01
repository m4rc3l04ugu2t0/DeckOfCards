import axios from 'axios'

export const addToPile = async (
  cards: string[],
  deck_id: string,
  pileName: string
) => {
  console.log(cards.join())
  const response = await axios.get(
    `https://www.deckofcardsapi.com/api/deck/${deck_id}/pile/${pileName}/add/?cards=${cards.join()}`
  )

  return response.data
}
