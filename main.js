// import { shuffle } from './src/api/shuffle.js'
import axios from "axios"

export const shuffle = async () => {
    const response = await axios('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const data = await response.data
    console.log(data)
}

shuffle()