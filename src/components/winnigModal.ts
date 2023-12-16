import { restart } from "../../main.js";
import type { player } from "../model.js";

class winnigModal {
    element: HTMLElement;

    constructor() {
        this.element = document.querySelector(".modals") as HTMLElement;
    }

    openModal(id: number, player: player) {

        const markup = /*html*/`
        <div class="modalBackdrop">
          <div class="modal">
            <h2>Player ${id} Wins!</h2>
            <h3>Score: ${player.score}</h3>  
            <span id="modalNewGameBtn">🔄 New Game</span>          
          </div>
        </div>
        `

        this.element.innerHTML = "";
        this.element.insertAdjacentHTML("afterbegin", markup);
        this.eventHandler();
    }

    closeModal() {
        this.element.innerHTML = "";
    }

    eventHandler() {
        this.element.querySelector("#modalNewGameBtn")?.addEventListener("click", restart);
    }
}

export default new winnigModal();