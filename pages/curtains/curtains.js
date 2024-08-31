import ModalBase from "../../modalBase.js";

class ModalCurtains extends ModalBase {
  constructor(modalId, closeButtonId, openButtonId) {
    super(modalId, closeButtonId);
    this.openButton = document.querySelector(`#${openButtonId}`);
    this.initCurtains();
  }

  initCurtains() {
    if (this.openButton) {
      this.openButton.addEventListener('click', (event) => this.openModal(event));
    } else {
      console.error('Error: Curtains modal elements not found');
    }
  }

  openModal(event) {
    event.preventDefault();
    this.modal.style.display = 'flex'; 
    this.modal.classList.add('is-open');

    this.toggleButton();
  }

  toggleButton() {
    const btn = document.querySelector('#close50');
    console.log(btn)
    if (btn) {
      let isActive = false;

      btn.addEventListener('click', () => {
        if (isActive) {
          btn.textContent = 'Close the curtains by 50%';
          btn.style.backgroundColor = '';
        } else {
          btn.textContent = 'The curtains are 50% closed';
          btn.style.backgroundColor = 'orange';
        }
        isActive = !isActive;
      });
    }
  }

  closeModal() {
    super.closeModal();
    this.modal.style.display = 'none'; 
    this.modal.classList.remove('is-open'); 
  }

  handleClickOutside(event) {
    if (event.target === this.modal) {
      this.closeModal();
    }
  }
}

const modalCurtains = new ModalCurtains('modal-form-content', 'modal-btn-close', 'button-open-modal');
