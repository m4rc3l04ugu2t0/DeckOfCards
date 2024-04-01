import axios from 'axios'

export const pileList = async (pile_name: string, deck_id: string) => {
  const response = await axios.get(
    `https://www.deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/list/`
  )

  response.data
}
