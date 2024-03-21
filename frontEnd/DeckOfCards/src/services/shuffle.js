import axios from 'axios'

export const shuffle = async () => {
  const response = await axios.get(
    'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2'
  )
  return await response.data
}
