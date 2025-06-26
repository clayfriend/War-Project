let deckId;

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
    });
}


document.getElementById("new-deck").addEventListener('click',handleClick);



document.getElementById("draw-deck").addEventListener('click', ()=>{
    if(!deckId){
        alert("Please First click the New Deck")
        return
    }
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res=>res.json())
    .then(data=>{
        const computerCard = data.cards[0]
        const playerCard=data.cards[1]

        const cardSlot=document.getElementById("cards").children
         cardSlot[0].innerHTML=`
            <img src=${data.cards[0].image} class="card">      
        `
        cardSlot[1].innerHTML=`     
            <img src=${data.cards[1].image} class="card">      
        `
        const result = determineWinner(computerCard,playerCard)
        console.log(result)

    })
})

function determineWinner(card1,card2){
    const valueMap = {
        "ACE": 14,
        "KING": 13,
        "QUEEN": 12,
        "JACK": 11,
        "10": 10,
        "9": 9,
        "8": 8,
        "7": 7,
        "6": 6,
        "5": 5,
        "4": 4,
        "3": 3,
        "2": 2
    }

    const card1Value = valueMap[card1.value]
    const card2Value = valueMap[card2.value]

    if(card1Value>card2Value){
        return "Computer Won!"
    } else if(card2Value>card1Value){
        return "You Won!"
    } else{
        return "It's a tie!"
    }

}