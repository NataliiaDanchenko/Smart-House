import ModalBase from "../../modalBase.js";

class ModalLamp extends ModalBase {
  constructor(modalId, closeButtonId, listItemSelector, divSelector) {
    super(modalId, closeButtonId);
    this.listItems = document.querySelectorAll(listItemSelector);
    this.initLamp();
  }

  initLamp() {
    if (this.listItems.length > 0) {
      this.listItems.forEach(item => {
        item.addEventListener('click', (event) => this.openModal(event));
      });
    } else {
      throw new Error('Lamp modal elements not found');
    }
  }

  openModal(event) {
    event.preventDefault();
    const content = event.currentTarget.textContent;
    this.displayContent(content);
    this.modal.classList.add('is-open');
  }

  displayContent(content) {
    const contentDiv = this.modal.querySelector('.modal-content-device');
    if (contentDiv) {
      const contentText = document.createElement('p');
      contentText.textContent = content;
      contentDiv.innerHTML = ''; 
      contentDiv.appendChild(contentText);

      contentDiv.innerHTML += `
            <div class="button-space">
              <button class="button-turn-on">Turn On</button>
              <button class="button-turn-50">Turn On 50%</button>
            </div>
        `;
      
      const turnOnButton = contentDiv.querySelector('.button-turn-on');
      const turn50Button = contentDiv.querySelector('.button-turn-50');

      turnOnButton.addEventListener('click', () => this.changeButtonColor(turnOnButton));
      turn50Button.addEventListener('click', () => this.changeButtonColor(turn50Button));
    }
  }

  changeButtonColor(activeButton) {
    const buttons = this.modal.querySelectorAll('.modal-content-device button');
    buttons.forEach(button => button.style.backgroundColor = '');

    activeButton.style.backgroundColor = 'orange';
  }
  
  closeModal() {
    super.closeModal(); 
  }

  handleClickOutside(event) {
    if (event.target === this.modal) {
      this.closeModal();
    }
  }
}

const modalLamp = new ModalLamp('modal-lamps', 'close-lamps', 'li', '.lamp-none');













