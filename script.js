"use strict";

const btnRoll = document.querySelector(".btn-roll");
const btnStart = document.querySelector(".btn-start");

const labelName1 = document.querySelector(".player-1");
const labelName2 = document.querySelector(".player-2");

const input1 = document.querySelector(".input1");
const input2 = document.querySelector(".input2");

const current1 = document.querySelector(".current-1");
const current2 = document.querySelector(".current-2");

const total1 = document.querySelector(".total-1");
const total2 = document.querySelector(".total-2");

const cart1 = document.querySelector(".cart-1");
const cart2 = document.querySelector(".cart-2");

const diceArea = document.querySelector(".dice-area");

const player1 = {
  part: 1,
  name: "player1",
  currentScore: 0,
  roundScore: 0,
  round: 1,
  active: true,
  scores: [],
};

const player2 = {
  part: 2,
  name: "player2",
  currentScore: 0,
  roundScore: 0,
  round: 1,
  active: false,
  scores: [],
};

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
  if (player1.active) {
    cart1.classList.remove("border-dark");
    cart2.classList.add("border-dark");
    player1.active = false;
    player2.active = true;
  } else {
    cart2.classList.remove("border-dark");
    cart1.classList.add("border-dark");
    player2.active = false;
    player1.active = true;
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

  player1.name = labelName1.textContent = input1.value;
  player2.name = labelName2.textContent = input2.value;

  cart1.classList.add("border-dark");
  cart2.classList.remove("border-dark");

  current1.textContent = "Current";
  current2.textContent = "Current";
  total1.textContent = 0;
  total2.textContent = 0;
  diceArea.textContent = `Round 1, ${player1.name}
   please Roll Dice`;
});

btnRoll.addEventListener("click", function () {
  // e.preventDefault();
  let dice;
  let current;
  let total;
  let activePlayer;
  player1.active ? (activePlayer = player1) : (activePlayer = player2);

  diceArea.textContent = dice = rollDice();

  //calculate current score
  current = currentScore(activePlayer.round, dice);

  if (activePlayer.part === 1) {
    total = Number(total1.textContent);
    current1.textContent = current;
  } else {
    total = Number(total2.textContent);
    current2.textContent = current;
  }

  if (current > 0) {
    if (activePlayer.part === 1) {
      total += current;
      total1.textContent = total;
    } else {
      total += current;
      total2.textContent = total;
    }
  } else {
    switchPlayer();
  }
});
