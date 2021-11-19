"use strict";

const btnRoll = document.querySelector(".btn-roll");
const btnStart = document.querySelector(".btn-start");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const input1 = document.querySelector(".input1");
const input2 = document.querySelector(".input2");
const current1 = document.querySelector(".current-1");
const current2 = document.querySelector(".current-2");
const total1 = document.querySelector(".total-1");
const total2 = document.querySelector(".total-2");
const cart1 = document.querySelector(".cart-1");
const cart2 = document.querySelector(".cart-2");
const diceArea = document.querySelector(".dice-area");
//function

//1- Roll Dice

const randomDice = function () {
  return Math.floor(Math.random() * 6 + 1);
};

const rollDice = function () {
  return [randomDice(), randomDice(), randomDice()];
};

//2- calculateCurrentScore

const currentScore = function (round, dice) {
  let rCount = 0;
  let temp = 0;
  let dCount = 0;
  dice.forEach((d) => {
    if (d === round) rCount++;

    d === temp ? dCount++ : (temp = d);
  });
  // console.log("rCount: ", rCount);
  // console.log("dCount: ", dCount);
  // console.log("temp: ", temp);

  if (dCount === 2 && rCount === 0) return 5;
  if (rCount === 3) return 21;
  return rCount;
};

/////////////////////////////////
// console.log("-------------------------Play Game------------------------");

//displays
const switchPlayer = function () {
  console.log("%cSwitching Player", "color: green; font-size: 1rem");
  if ([...cart1.classList].includes("border-dark")) {
    cart1.classList.remove("border-dark");
    cart2.classList.add("border-dark");
  } else {
    cart2.classList.remove("border-dark");
    cart1.classList.add("border-dark");
  }
};
const displayDice = function (dice) {
  document.querySelector(".dice").textContent = [...dice];
};

const displayTotalScore = function (score) {
  console.log("Total: ", score);
};
const displayCurrentScore = function (score) {
  console.log("Current: ", score);
};

// console.log("%cHello", "color: green; background: yellow; font-size: 1rem");

btnStart.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log("in event handler: ", input1.value);
  cart1.classList.add("border-dark");
  cart2.classList.remove("border-dark");

  player1.textContent = input1.value;
  player2.textContent = input2.value;
  current1.textContent = 0;
  current2.textContent = 0;
  total1.textContent = 0;
  total2.textContent = 0;
});

btnRoll.addEventListener("click", function () {
  // e.preventDefault();
  let dice;
  let current;
  let total;
  const isPlayer1 = [...cart1.classList].includes("border-dark");
  console.log("btnDice listener", isPlayer1);
  if (isPlayer1) {
    total = Number(total1.textContent);
    diceArea.textContent = dice = rollDice();
    current1.textContent = current = currentScore(1, dice);
  } else {
    total = Number(total2.textContent);
    diceArea.textContent = dice = rollDice();
    current2.textContent = current = currentScore(1, dice);
  }

  if (current > 0) {
    if (isPlayer1) {
      total += current;
      total1.textContent = total;
    } else {
      total += current;
      total2.textContent = total;
    }
  } else {
    switchPlayer();
  }

  //   let totalSet1 = 0;
  //   let dice = rollDice();
  //   console.log(dice);
  //   displayDice(dice);
  //   const current = currentScore(1, dice);
  //   displayCurrentScore(current);
  //   if (current > 0) {
  //     totalSet1 += current;
  //     totalScore1 += totalSet1;
  //     displayTotalScore(totalScore1);
  //     console.log("Roll Again!");
});

// Arash
// //displays
// const switchPlayer = function () {
//   console.log("%cSwitching Player", "color: green; font-size: 1rem");
// };

// const displayDice = function (dice) {
//   document.querySelector(".dice-show").textContent = [...dice];
// };

// const displayTotalScore = function (score) {
//   document.querySelector(".total-score-1").textContent = score;

//   console.log("Total: ", score);
// };

// const displayCurrentScore = function (score) {
//   document.querySelector(".current-score-1").textContent = score;
//   console.log("Current: ", score);
// };

// let totalScore1 = 0;
// let totalScore2 = 0;

// document.querySelector(".btn-dice").addEventListener("click", function () {
//   let totalSet1 = 0;
//   let dice = rollDice();
//   console.log(dice);
//   displayDice(dice);
//   const current = currentScore(1, dice);
//   displayCurrentScore(current);
//   if (current > 0) {
//     totalSet1 += current;
//     totalScore1 += totalSet1;
//     displayTotalScore(totalScore1);
//     console.log("Roll Again!");

//     // document.querySelector(".btn-dice").addEventListener('click', )
//   } else switchPlayer();
// });
