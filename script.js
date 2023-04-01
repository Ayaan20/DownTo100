'use strict';

//defining variables and selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;
//defining functions :

const newGame = function () {
  if (activePlayer === 1) {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceImg.classList.add('hidden');
};
const rollDice = function () {
  const diceNumber = Math.trunc(Math.random() * 6 + 1);
  console.log(diceNumber);
  diceImg.classList.remove('hidden');
  //now i have to link the dice img with the random number
  //using switch will be a good option
  //   switch (diceNumber) {
  //     case 1:
  //       diceImg.src = './dice-1.png';
  //       break;
  //     case 2:
  //       diceImg.src = './dice-2.png';
  //       break;
  //     case 3:
  //       diceImg.src = './dice-3.png';
  //       break;
  //     case 4:
  //       diceImg.src = './dice-4.png';
  //       break;
  //     case 5:
  //       diceImg.src = './dice-5.png';
  //       break;
  //     case 6:
  //       diceImg.src = './dice-6.png';
  //       break;
  //   }
  // Better way is to use template literals

  diceImg.src = `dice-${diceNumber}.png`;

  // Now i need to check whether the dice roll 1 or not
  if (diceNumber !== 1) {
    currentScore += diceNumber;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // document
    //   .querySelector(`.player--${activePlayer}`)
    //   .classList.remove('player--active');
    switchPlayer();
  }
};

const holdScore = function () {
  if (playing) {
    scores[`${activePlayer}`] += currentScore;
    if (scores[`${activePlayer}`] >= 100) {
      playing = false;
      diceImg.classList.toggle('hidden');
      // document.querySelector(`#current--${activePlayer}`).textContent = 0;
      // console.log(`Congratulation Player ${activePlayer + 1} wins `);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[`${activePlayer}`];
      //   document.querySelector(`.current--${activePlayer}`).textContent = 0;

      // newGame();
    } else {
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[`${activePlayer}`];
      switchPlayer();
    }
  }
};
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling the dice
// 1) Add an event listner to the roll dice button
btnRoll.addEventListener('click', function () {
  if (playing) rollDice();
});
btnHold.addEventListener('click', function () {
  if (playing) holdScore();
});
//Initializing the initial state of our game
newGame();

btnNew.addEventListener('click', function () {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  newGame();
});
