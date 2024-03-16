import axios from 'axios'

type shuffletype = {
  success: boolean
  deck_id: string
  shuffled: boolean
  remaining: number
}
export const shuffle = async () => {
  try {
    const response = await axios.get<shuffletype[]>(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    )

    return await response.data
  } catch (err) {
    console.log(err)
  }
}
