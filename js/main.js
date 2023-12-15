import { state } from "./src/model.js";
const diceEl = document.querySelector(".dice");
const diceNumberEl = document.querySelector("#diceNumber");
const playerOneCardEl = document.querySelector(".playerOneCard");
const playerOneScoreEl = document.querySelector("#playerOneScore");
const playerOneCurrentScoreEl = document.querySelector("#playerOneCurrentScore");
const playerTwoCardEl = document.querySelector(".playerTwoCard");
const playerTwoScoreEl = document.querySelector("#playerTwoScore");
const playerTwoCurrentScoreEl = document.querySelector("#playerTwoCurrentScore");
const newGameBtn = document.querySelector("#newGameBtn");
const rollDiceBtn = document.querySelector("#rollDiceBtn");
const holdBtn = document.querySelector("#holdBtn");
const setDice = () => {
    state.diceNumber = Math.floor((Math.random() * 10) - 3);
    for (let i = 1; state.diceNumber <= 0; i++) {
        state.diceNumber = Math.floor((Math.random() * 10) - 3);
    }
    if (state.role === 1) {
        state.playerOne.currentScore = state.playerOne.currentScore + state.diceNumber;
        playerOneCurrentScoreEl.innerHTML = `${state.playerOne.currentScore}`;
    }
    else if (state.role === 2) {
        state.playerTwo.currentScore = state.playerTwo.currentScore + state.diceNumber;
        playerTwoCurrentScoreEl.innerHTML = `${state.playerTwo.currentScore}`;
    }
    if (state.diceNumber === 1) {
        state.role === 1 ? state.role = 2 : state.role = 1;
        if (playerOneCardEl.classList.contains("role")) {
            playerOneCardEl.classList.remove("role");
            playerOneCardEl.classList.add("notRole");
            playerTwoCardEl.classList.remove("notRole");
            playerTwoCardEl.classList.add("role");
            state.playerOne.currentScore = 0;
            playerOneCurrentScoreEl.innerHTML = `${state.playerOne.currentScore}`;
        }
        else {
            playerOneCardEl.classList.remove("notRole");
            playerOneCardEl.classList.add("role");
            playerTwoCardEl.classList.remove("role");
            playerTwoCardEl.classList.add("notRole");
            state.playerTwo.currentScore = 0;
            playerTwoCurrentScoreEl.innerHTML = `${state.playerTwo.currentScore}`;
        }
    }
    diceNumberEl.innerHTML = `${state.diceNumber}`;
};
rollDiceBtn.addEventListener("click", setDice);
function restart() {
    window.location.href = "/";
}
const holdScores = () => {
    if (state.role === 1) {
        state.playerOne.score = state.playerOne.score + state.playerOne.currentScore;
        state.playerOne.currentScore = 0;
        playerOneCurrentScoreEl.innerHTML = `${state.playerOne.currentScore}`;
        playerOneScoreEl.innerHTML = `${state.playerOne.score}`;
        state.role = 2;
    }
    else if (state.role === 2) {
        state.playerTwo.score = state.playerTwo.score + state.playerTwo.currentScore;
        state.playerTwo.currentScore = 0;
        playerTwoCurrentScoreEl.innerHTML = `${state.playerTwo.currentScore}`;
        playerTwoScoreEl.innerHTML = `${state.playerTwo.score}`;
        state.role = 1;
    }
    if (playerOneCardEl.classList.contains("role")) {
        playerOneCardEl.classList.remove("role");
        playerOneCardEl.classList.add("notRole");
        playerTwoCardEl.classList.remove("notRole");
        playerTwoCardEl.classList.add("role");
    }
    else {
        playerOneCardEl.classList.remove("notRole");
        playerOneCardEl.classList.add("role");
        playerTwoCardEl.classList.remove("role");
        playerTwoCardEl.classList.add("notRole");
    }
    if (state.playerOne.score >= 100) {
        alert("Player One Wins!");
        setTimeout(() => {
            restart();
        }, 1000);
    }
    if (state.playerTwo.score >= 100) {
        alert("Player Two Wins!");
        setTimeout(() => {
            restart();
        }, 1000);
    }
};
holdBtn.addEventListener("click", holdScores);
