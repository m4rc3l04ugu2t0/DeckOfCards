export const moveCard = () => {
  const cards = document.querySelectorAll('.card')
  let cardCurrent = null

  cards.forEach((card) => {
    card.addEventListener('dragstart', dragStart)
    card.addEventListener('dragend', dragEnd)
  })

  function dragStart() {
    this.classList.add('dragging')
    cardCurrent = this
  }

  function dragEnd() {
    this.classList.remove('dragging')
    cardCurrent = null
  }

  document.addEventListener('dragover', (e) => e.preventDefault())

  document.addEventListener('drop', (e) => {
    if (cardCurrent) {
      e.preventDefault()
      const target = e.target.closest('.dropzone')
      if (target) {
        const targetReact = target.getBoundingClientRect()
        if (cardCurrent !== target) {
          if (e.clientY > targetReact.top + targetReact.height / 2) {
            console.log('1')
            target.appendChild(cardCurrent)
          } else {
            console.log('2')

            target.appendChild(cardCurrent, target)
          }
        }
      }
    }
  })
}
