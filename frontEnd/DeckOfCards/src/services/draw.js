import axios from 'axios'

export const draw = async (deck_id) => {
  const response =
    await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=9
    `)
  return await response.data
}
