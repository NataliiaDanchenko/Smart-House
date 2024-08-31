import ModalBase from "../../modalBase.js";

class ModalConditioner extends ModalBase {
  constructor(modalId, closeButtonId, openButtonId) {
    super(modalId, closeButtonId);
    this.openButton = document.querySelector(`#${openButtonId}`);
    this.initConditioner();
  }

  initConditioner() {
    if (this.openButton) {
      this.openButton.addEventListener('click', (event) => this.openModal(event));
    } else {
      console.error('Error: Air Conditioner modal elements not found');
    }
  }

  openModal(event) {
    event.preventDefault();
    this.modal.style.display = 'flex'; 
    this.modal.classList.add('is-open');
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

const modalConditioner = new ModalConditioner('modal-form-content', 'modal-btn-close', 'button-open-modal');


