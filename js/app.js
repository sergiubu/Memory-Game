// Create a list that holds all of your cards
const deck = document.getElementsByClassName('card');
const deckArr = [...deck];
// Empty array to store selected cards
let openedCards = [];
// Declaring move var & selecting moves counter
let move = 0;
const moves = document.querySelector('.moves');
// Select star rating
const stars = document.querySelectorAll('.fa-star');
// Matched cards
const matchedCards = document.getElementsByClassName('match');

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

// Prevent user from flipping more than 2 cards
function disableCards() {
  [].filter.call(deckArr, deck => {
    deck.classList.add('disable');
  });
}

// Enable disabled cards and disable matched cards
function enableCards() {
  [].filter.call(deckArr, deck => {
    deck.classList.remove('disable');
    for (var i = 0; i < matchedCards.length; i++) {
      matchedCards[i].classList.add('disable');
    }
  });
}

// Keep track of player moves
function moveCounter() {
  move++;
  moves.innerHTML = move;

  // Display star rating
  if (move > 13 && move < 15) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
      }
    }
  } else if (move > 15) {
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse';
      }
    }
  }
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

// Starts a new game
function startGame() {
  // Select all cards
  const deck = document.querySelector('.deck');
  // Shuffle cards
  shuffle(deckArr);
  // Loop through each card and remove classes
  for (let i = 0; i < deckArr.length; i++) {
    deck.innerHTML = '';
    [].forEach.call(deckArr, (item) => {
      deck.appendChild(item);
    });
    deckArr[i].classList.remove('show', 'open', 'match', 'disable', 'rotateIn', 'wobble', 'shake');
  }

  // Clear opened cards array
  openedCards = [];
}

// Shuffles cards when the window is loaded
window.onload = startGame();
