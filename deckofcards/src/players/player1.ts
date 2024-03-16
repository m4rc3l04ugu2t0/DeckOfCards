import { distributeCards } from '../handleCards/distribute'

const sectionPlayer1 = document.querySelector('#player1')

export const deckPlayer1 = async () => {
  const cards = await distributeCards()
  const images: string[] = []

  cards?.forEach((image) => {
    images.push(`<img class="w-32 h-52" src="${image.image}" />`)
  })

  sectionPlayer1!.innerHTML = images.join('')
}
