import axios from 'axios'

export const draw = async (deck_id: string, count: string) => {
  const response =
    await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}
    `)

  const sla = await axios.get(
    `https://www.deckofcardsapi.com/api/deck/${deck_id}`
  )

  console.log(sla.data)
  return await response.data
}
