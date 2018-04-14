// Create a list that holds all of your cards
const deck = document.getElementsByClassName('card');
const deckArr = [...deck];
// Empty array to store selected cards
let openedCards = [];

// Add/remove card classes
function flipCard() {
  this.classList.toggle('rotateIn');
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disable');
}

// Add event listeners to each card
for (var i = 0; i < deckArr.length; i++) {
  deckArr[i].addEventListener('click', flipCard);
  deckArr[i].addEventListener('click', selectedCards);
}

// Check if flipped cards match
function selectedCards() {
  openedCards.push(this);
  const length = openedCards.length;
  if (length === 2) {
    moveCounter();
    openedCards[0].innerHTML === openedCards[1].innerHTML ? match() : noMatch();
  }
}

// If the cards match
function match() {
  openedCards[0].classList.add('match', 'wobble');
  openedCards[1].classList.add('match', 'wobble');
  openedCards[0].classList.remove('open', 'show', 'rotateIn');
  openedCards[1].classList.remove('open', 'show', 'rotateIn');
  openedCards = [];
}

// If the cards don't match
function noMatch() {
  openedCards[0].classList.add('nomatch');
  openedCards[1].classList.add('nomatch');
  disableCards();
  setTimeout(_ => {
    openedCards[0].classList.remove('show', 'open', 'nomatch', 'rotateIn', 'wobble');
    openedCards[1].classList.remove('show', 'open', 'nomatch', 'rotateIn', 'wobble');
    enableCards();
    openedCards = [];
  }, 1100);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
