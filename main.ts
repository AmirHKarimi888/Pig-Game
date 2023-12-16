import { state } from "./src/model.js";
import winnigModal from "./src/components/winnigModal.js";
import areUSureModal from "./src/components/areUSureModal.js";

const diceEl = document.querySelector(".dice") as HTMLElement;
const diceNumberEl = document.querySelector("#diceNumber") as HTMLElement;

const playerOneCardEl = document.querySelector(".playerOneCard") as HTMLElement;
const playerOneScoreEl = document.querySelector("#playerOneScore") as HTMLElement;
const playerOneCurrentScoreEl = document.querySelector("#playerOneCurrentScore") as HTMLElement;

const playerTwoCardEl = document.querySelector(".playerTwoCard") as HTMLElement;
const playerTwoScoreEl = document.querySelector("#playerTwoScore") as HTMLElement;
const playerTwoCurrentScoreEl = document.querySelector("#playerTwoCurrentScore") as HTMLElement;

const newGameBtn = document.querySelector("#newGameBtn") as HTMLElement;
const rollDiceBtn = document.querySelector("#rollDiceBtn") as HTMLElement;
const holdBtn = document.querySelector("#holdBtn") as HTMLElement;


const rollDice = () => {
    state.diceNumber = Math.floor((Math.random() * 10) - 3);

    for(let i = 1; state.diceNumber <= 0 ; i++) {
        state.diceNumber = Math.floor((Math.random() * 10) - 3);
    }

    if(state.role === 1) {
        state.playerOne.currentScore = state.playerOne.currentScore + state.diceNumber;
        playerOneCurrentScoreEl.innerHTML = `${state.playerOne.currentScore}`;

    } else if(state.role === 2) {
        state.playerTwo.currentScore = state.playerTwo.currentScore + state.diceNumber;
        playerTwoCurrentScoreEl.innerHTML = `${state.playerTwo.currentScore}`;
    }

    if(state.diceNumber === 1) {

        state.role === 1 ? state.role = 2 : state.role = 1;

        if(playerOneCardEl.classList.contains("role")) {
            playerOneCardEl.classList.remove("role");
            playerOneCardEl.classList.add("notRole");
            playerTwoCardEl.classList.remove("notRole");
            playerTwoCardEl.classList.add("role");

            state.playerOne.currentScore = 0;
            playerOneCurrentScoreEl.innerHTML = `${state.playerOne.currentScore}`;

        } else {
            playerOneCardEl.classList.remove("notRole");
            playerOneCardEl.classList.add("role");
            playerTwoCardEl.classList.remove("role");
            playerTwoCardEl.classList.add("notRole");

            state.playerTwo.currentScore = 0;
            playerTwoCurrentScoreEl.innerHTML = `${state.playerTwo.currentScore}`;
        }
    }

    diceNumberEl.innerHTML = `${state.diceNumber}`;
}
rollDiceBtn.addEventListener("click", rollDice);


const holdScores = () => {

    if(state.role === 1) {
        state.playerOne.score = state.playerOne.score + state.playerOne.currentScore;
        state.playerOne.currentScore = 0;
        playerOneCurrentScoreEl.innerHTML = `${state.playerOne.currentScore}`;
        playerOneScoreEl.innerHTML = `${state.playerOne.score}`;
        state.role = 2;

    } else if(state.role === 2) {
        state.playerTwo.score = state.playerTwo.score + state.playerTwo.currentScore;
        state.playerTwo.currentScore = 0;
        playerTwoCurrentScoreEl.innerHTML = `${state.playerTwo.currentScore}`;
        playerTwoScoreEl.innerHTML = `${state.playerTwo.score}`;
        state.role = 1;
    }

    if(playerOneCardEl.classList.contains("role")) {
        playerOneCardEl.classList.remove("role");
        playerOneCardEl.classList.add("notRole");
        playerTwoCardEl.classList.remove("notRole");
        playerTwoCardEl.classList.add("role");

    } else {
        playerOneCardEl.classList.remove("notRole");
        playerOneCardEl.classList.add("role");
        playerTwoCardEl.classList.remove("role");
        playerTwoCardEl.classList.add("notRole");

    }

    if(state.playerOne.score >= 100) {
        winnigModal.openModal(1, state.playerOne);
    }

    if(state.playerTwo.score >= 100) {
        winnigModal.openModal(2, state.playerTwo);
    }
}

holdBtn.addEventListener("click", holdScores);
newGameBtn.addEventListener("click", () => areUSureModal.openModal());


export function restart() {
    diceNumberEl.innerHTML = "1";

    playerOneCardEl.classList.remove("notRole");
    playerOneCardEl.classList.add("role");
    playerTwoCardEl.classList.remove("role");
    playerTwoCardEl.classList.add("notRole");

    playerOneCurrentScoreEl.innerHTML = "0";
    playerOneScoreEl.innerHTML = "0";

    playerTwoCurrentScoreEl.innerHTML = "0";
    playerTwoScoreEl.innerHTML = "0";

    state.diceNumber = 0;
    state.playerOne.currentScore = 0;
    state.playerOne.score = 0;

    state.playerTwo.currentScore = 0;
    state.playerTwo.score = 0;

    state.role = 1;

    areUSureModal.closeModal();
}