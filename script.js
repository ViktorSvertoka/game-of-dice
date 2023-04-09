'use strict';

// Elements selection
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Game initial conditions

let totalScore;
let currentScore;
let activePlayer;
let isPlaying;

const initGame = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;

  current0Element.textContent = 0;
  current1Element.textContent = 0;

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');

  player0Element.classList.add('player--active');

  diceElement.classList.add('hidden');
};

initGame();

const switchActivePlayer = function () {
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Roll the dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Create a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    // 2. Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `./image/dice${diceNumber}.png`;

    // 3. If the number is 1, switch to the next player, if not - add number to the current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Add current score to active player total score
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    // 2. If total score of active player >= 100, active player won, if not - switch active player
    if (totalScore[activePlayer] >= 100) {
      isPlaying = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);

//! Page reload option #2.
// const reloadButton = document
//   .querySelector('.btn--new')
//   .addEventListener('click', () => {
//     location.reload();
//   });
