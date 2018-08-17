//set a variable to the card class
const cards = document.querySelectorAll('.memory-card');

//how do we know if this is the first or second time the player has flipped the card?
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  if (lockBoard) return;
  if (this === firstCard) return;

  // console.log('clicked');
  //in this context what does this represent?
  // console.log(this);
  //'this' represents the element that fired the event

  //access the class list and toggle the flipCard function
  this.classList.add('flip')
  if(!hasFlippedCard){
    //first click
    hasFlippedCard = true;
    firstCard = this;

    // console.log({hasFlippedCard, firstCard});
  } else {
    //second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
    // console.log({firstCard, secondCard})

    //do cards match?
    // console.log(firstCard.dataset.framework);
    // console.log(secondCard.dataset.framework);

    }
  }

  function checkForMatch(){
      if(firstCard.dataset.framework === secondCard.dataset.framework){
        //it matches
        disableCards();
      } else {
        unflipCards();
      }
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(()=>{
      //not a match
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
      // lockBoard = false;
    }, 1500);
  }

  function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
//Immediately Invoked Function Expression - invoked immediately after defined.

//iterate through each card and run the flipCard function
cards.forEach(card => card.addEventListener('click', flipCard))
