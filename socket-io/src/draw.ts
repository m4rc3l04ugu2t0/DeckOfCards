import axios from 'axios'

export const draw = async (deck_id: string, count: string) => {
  const response =
    await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}
    `)

  return await response.data
}
