import axios from 'axios'

export const createPlayerPile = async (idPlayer: string, deck_id: string) => {
  console.log(idPlayer, deck_id)
  const response = await axios.post(
    `https://www.deckofcardsapi.com/api/deck/${deck_id}/pile/${idPlayer}/add/?cards=`
  )

  return response.data
}
