const cardsPlayer2 = document.getElementById('player2')

export const player2 = async (cards) => {
  const images = []

  cards.cards.map((card) => {
    images.push(`<img src="${card.image}" alt="card image" class="w-36 h-56">`)
  })

  cardsPlayer2.innerHTML = images.join('')
}
