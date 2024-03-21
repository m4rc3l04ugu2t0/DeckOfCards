export const startGame = (id, status, total, playing) => {
  if (total < 2 && !playing) {
    return JSON.stringify({ clientMsg: 'insufficient number of users' })
  }
}

document.getElementById('play').onclick = startGame
