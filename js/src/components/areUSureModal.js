import { restart } from "../../main.js";
class areUSureModal {
    element;
    constructor() {
        this.element = document.querySelector(".modals");
    }
    openModal() {
        const markup = /*html*/ `
        <div class="modalBackdrop">
          <div class="modal"> 
            <h3>Are you sure to finish this game?</h3>
            <span id="isNotSureBtn">❌ No</span>  
            <span id="isSureBtn">✅ Yes</span>        
          </div>
        </div>
        `;
        this.element.innerHTML = "";
        this.element.insertAdjacentHTML("afterbegin", markup);
        this.eventHandler();
    }
    closeModal() {
        this.element = document.querySelector(".modals");
        this.element.innerHTML = "";
    }
    eventHandler() {
        this.element.querySelector("#isSureBtn")?.addEventListener("click", restart);
        this.element.querySelector("#isNotSureBtn")?.addEventListener("click", this.closeModal);
        this.element.querySelector(".modalBackdrop")?.addEventListener("click", this.closeModal);
        this.element.querySelector(".modal")?.addEventListener("click", (event) => event.stopPropagation());
    }
}
export default new areUSureModal();
