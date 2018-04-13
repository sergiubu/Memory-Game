// Create a list that holds all of your cards
const deck = document.getElementsByClassName('card');
const deckArr = [...deck];

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
