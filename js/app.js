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
// Declaring time var & selecting timer
let   seconds = 0,
      minutes = 0,
      interval;
const timer = document.querySelector('.timer');
// Select modal
const modal = document.getElementById('modal');

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
  deckArr[i].addEventListener('click', endGame);
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

// Timer
function startTimer() {
  // Remove Start Timer event listener
  [].filter.call(deckArr, deck => {
    deck.removeEventListener('click', startTimer);
  });

  interval = setInterval(function () {
    timer.innerHTML = minutes.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ' : ' + seconds.toLocaleString(undefined, {minimumIntegerDigits: 2});
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
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
  // Add event listener for starting the timer
  for (var i = 0; i < deckArr.length; i++) {
    deckArr[i].addEventListener('click', startTimer);
  }

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
  // Reset moves
  move = 0;
  moves.innerHTML = move;
  // Reset star rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.visibility = 'visible';
  }
  // Reset timer
  seconds = 0;
  minutes = 0;
  timer.innerHTML = '00 : 00';
  clearInterval(interval);
  // Clear opened cards array
  openedCards = [];
}

// Shuffles cards when the window is loaded
window.onload = startGame();

// Modal showing total time, rating and moves
function endGame() {
  if (matchedCards.length === 16) {
    clearInterval(interval);
    // Display modal
    setTimeout( _ => {
      modal.classList.add('show');
    }, 1000);
    // Display total moves, time and star rating
    const showTime = timer.innerHTML;
    const showRating = document.querySelector('.stars').innerHTML;
    document.getElementById('showMoves').innerHTML = move;
    document.getElementById('showTime').innerHTML = showTime;
    document.getElementById('showRating').innerHTML = showRating;
    // Run close modal
    closeModal();
  }
}

// Closes modal
function closeModal() {
  const close = document.querySelector('.close');
  close.addEventListener('click', _ => {
    modal.classList.remove('show');
  });
}

// Play again button on modal
function playAgain() {
  modal.classList.remove('show');
  startGame();
}
