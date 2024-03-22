export const player2 = async (cards = false) => {
  const cardsPlayer2 = document.getElementById('player2')
  if (!cards) {
    cardsPlayer2.innerHTML = `
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card1">
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card2">
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card3">
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card4">
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card5">
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card6">
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card7">
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card8">
    <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Verso da Carta" class="card w-36 h-46" id="card9">    `

    return
  }
  const images = []
  let count = 1
  count
  cards.cards.map((card) => {
    images.push(
      `<img src="${card.image}" alt="card image" id="card${count}" class="card w-36 h-56">`
    )
    count++
  })

  cardsPlayer2.innerHTML = images.join('')
}
