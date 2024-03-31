export let cardCurrent = null

export const dragover = (e) => {
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
}

function dragStart() {
  this.classList.add('dragging')
  cardCurrent = this
}

function dragEnd() {
  this.classList.remove('dragging')
  cardCurrent = null
}

export const moveCard = () => {
  const cards = document.querySelectorAll('.card')

  cards.forEach((card) => {
    card.addEventListener('dragstart', dragStart)
    card.addEventListener('dragend', dragEnd)
  })

  document.addEventListener('dragover', (e) => e.preventDefault())
  document.addEventListener('drop', dragover)
}

export const removeDragAndDrop = () => {
  const cards = document.querySelectorAll('.card')

  cards.forEach((card) => {
    card.removeEventListener('dragstart', dragStart)
    card.removeEventListener('dragend', dragEnd)
  })

  document.removeEventListener('dragover', (e) => e.preventDefault())
  document.removeEventListener('drop', dragover)
}
