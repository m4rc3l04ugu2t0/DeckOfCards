import axios from 'axios'
import { DrawResponseProps } from '../types'

export const drawCards = async (deck_id: string) => {
  try {
    const response = await axios.get<DrawResponseProps>(
      `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=9`
    )
    return response.data
  } catch (err) {
    console.log(err)
  }
}
