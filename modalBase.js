export default class ModalBase {
  constructor(modalId, closeButtonId) {
    this.modal = document.querySelector(`#${modalId}`);
    this.closeButton = document.querySelector(`#${closeButtonId}`);
    this.listItems = document.querySelectorAll('li');
    this.divs = document.querySelectorAll('.lamp-none');

    this.init();
  }

  init() {
    if (this.modal && this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeModal());
      this.modal.addEventListener('click', (event) => this.handleClickOutside(event));
      this.listItems.forEach(item => {
        item.addEventListener('click', (event) => this.openModal(event));
      });
      this.divs.forEach(div => {
        div.addEventListener('click', (event) => this.displayFlex(event));
      });
    } else {
      throw new Error('Modal elements not found');
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
      contentDiv.textContent = content;
    }
  }

  closeModal() {
    this.modal.classList.remove('is-open');
  }

  handleClickOutside(event) {
    if (event.target === this.modal) {
      this.closeModal();
    }
  }

  isModalOpen() {
    return this.modal.classList.contains('is-open');
  }
}


