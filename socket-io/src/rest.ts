import axios from 'axios'

export const rest = async (deck_id: string) => {
  const response = await axios.get(
    `https://www.deckofcardsapi.com/api/deck/${deck_id}`
  )
  return response.data
}
