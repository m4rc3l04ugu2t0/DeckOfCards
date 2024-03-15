fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(response => response.json())
  .then(deck => {
    const deckId = deck.deck_id;
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(response => response.json())
      .then(hand => {
        console.log('Sua mão:', hand.cards);
      });
  });
const sla = 1