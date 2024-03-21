const cardsPlayer1 = document.getElementById('player1')

export const player1 = async (cards) => {
  const images = []

  cards.cards.map((card) => {
    images.push(`<img src="${card.image}" alt="card image" class="w-36 h-56">`)
  })

  cardsPlayer1.innerHTML = images.join('')
}
