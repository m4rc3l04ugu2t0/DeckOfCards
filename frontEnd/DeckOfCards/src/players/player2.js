const cardsPlayer2 = document.getElementById('player2')

export const player2 = async (cards = false) => {
  if (!cards) {
    cardsPlayer2.innerHTML = `
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
        <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="w-36 h-46">
    `

    return
  }
  const images = []

  cards.cards.map((card) => {
    images.push(`<img src="${card.image}" alt="card image" class="w-36 h-56">`)
  })

  cardsPlayer2.innerHTML = images.join('')
}
