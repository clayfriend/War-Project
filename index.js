let deckId;
let myScoreCard = 0;
let computerScoreCard = 0;
const drawButton = document.getElementById("draw-deck");
const remainText = document.getElementById("remained");
const myScore = document.getElementById("my-score");
const winnerText = document.getElementById("winner-text");
const computerScore = document.getElementById("computer-score");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      remainText.textContent = `Remained Card: ${data.remaining}`;
      deckId = data.deck_id;
    });
}

document.getElementById("new-deck").addEventListener("click", handleClick);

drawButton.addEventListener("click", () => {
  if (!deckId) {
    alert("Please First click the New Deck");
    return;
  }
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      if (data.cards.length < 2) {
        disableButton(data.remaining);
        return;
      }
      const computerCard = data.cards[0];
      const playerCard = data.cards[1];

      remainText.textContent = `Remain Cards: ${data.remaining}`;

      const cardSlot = document.getElementById("cards").children;
      cardSlot[0].innerHTML = `
            <img src=${data.cards[0].image} class="card">      
        `;
      cardSlot[1].innerHTML = `     
            <img src=${data.cards[1].image} class="card">      
        `;
      const result = determineWinner(computerCard, playerCard);
      winnerText.textContent = result;
      computerScore.textContent = `Computer score: ${computerScoreCard}`;
      myScore.textContent = `Computer score: ${myScoreCard}`;
      disableButton(data.remaining);
    });
});

function disableButton(remained) {
  if (remained === 0) {
    drawButton.disabled = true;
    drawButton.classList.add("dissable-btn");

    if (computerScoreCard > myScoreCard) {
      winnerText.textContent = `Computer is the winner!`;
    } else if (myScoreCard > computerScoreCard) {
      winnerText.textContent = "You are the winner";
    } else {
      winnerText.textContent = "It is a draw";
    }
  }
}

function determineWinner(card1, card2) {
  const valueMap = {
    ACE: 14,
    KING: 13,
    QUEEN: 12,
    JACK: 11,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };

  const card1Value = valueMap[card1.value];
  const card2Value = valueMap[card2.value];

  if (card1Value > card2Value) {
    computerScoreCard++;
    return "Computer Won!";
  } else if (card2Value > card1Value) {
    myScoreCard++;
    return "You Won!";
  } else {
    return "It's a tie!";
  }
}
