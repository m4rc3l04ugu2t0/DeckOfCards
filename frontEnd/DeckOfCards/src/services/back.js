import axios from 'axios'

export const back = async () => {
  const response = await axios.get(
    'https://www.deckofcardsapi.com/static/img/back.png'
  )

  return await response.data
}
