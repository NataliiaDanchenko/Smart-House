import ModalBase from "../../modalBase.js";

class ToggleList {
  constructor(buttonSelector, listSelector, input, buttonClearFilm, movieDisplay) {
    this.button = document.querySelector(buttonSelector);
    this.list = document.querySelector(listSelector);
    this.input = document.querySelector(input);
    this.buttonClearFilm = document.querySelector(buttonClearFilm);
    this.displayMovie = document.querySelector('#movieDisplay');

    this.list.style.display = 'none';

    this.button.addEventListener('click', (event) => this.toggleList(event));

    document.addEventListener('click', (event) => this.handleDocumentClick(event));
  }

  toggleList(event) {
    event.stopPropagation();

    if (this.list.style.display === 'none') {
      this.list.style.display = 'block';
    } else {
      this.list.style.display = 'none';
    }

    if (this.input.style.display === 'block') {
      this.input.style.display = 'none';
      this.buttonClearFilm.style.display = 'none'; 
      if (this.displayMovie.innerHTML !== '') {
        this.displayMovie.innerHTML = '';
      }
    }
  }

  handleDocumentClick(event) {
    const filmButton = document.querySelector('#film');

    if (event.target === filmButton) {
      this.list.style.display = 'none';
    }
  }
}

const toggleList = new ToggleList('#channel', '#channel-list', '#movieInput', '#clearMovie', '#movieDisplay');

class ModalTv extends ModalBase {
  constructor(modalId, closeButtonId, listItemSelector) {
    super(modalId, closeButtonId);
    this.listItems = document.querySelectorAll(listItemSelector);
    this.initTv();
  }

  initTv() {
    if (this.listItems.length > 0) {
      this.listItems.forEach(item => {
        item.addEventListener('click', (event) => this.openModal(event));
      });
    } else {
      console.error('Error: TV modal elements not found');
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
      contentDiv.innerHTML = `
            <p>${content}</p>
            <div>
                <button id="toggleButton">Record</button>
            </div>
        `;
      const button = contentDiv.querySelector('#toggleButton');
      if (button) {
        let isActive = false; 

        button.addEventListener('click', () => {
          if (isActive) {
            button.textContent = 'Record';
            button.style.backgroundColor = ''; 
          } else {
            button.textContent = 'The recording is on'; 
            button.style.backgroundColor = 'orange'; 
          }
          isActive = !isActive; 
        });
      }
    }
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

const modalTv = new ModalTv('modal-lamps', 'close-lamps', 'li', '.lamp-none');

class MovieFetcher {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.omdbapi.com/';
    this.movieData = null; 
    this.displayContainer = document.getElementById('movieDisplay'); 
  }

  async fetchMovie(value) {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&t=${encodeURIComponent(value)}&plot=full`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.movieData = await response.json();
      console.log(this.movieData);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  displayMovieData() {
    if (this.movieData) {
      this.clearDisplay(); 

      const title = document.createElement('h3');
      title.textContent = this.movieData.Title; 
      this.displayContainer.appendChild(title);

      if (Array.isArray(this.movieData.Actors)) {
        this.movieData.Actors.forEach(actor => {
          const data = document.createElement('p');
          data.textContent = actor; 
          this.displayContainer.appendChild(data);
        });
      } else {
        const data = document.createElement('div');
        data.textContent = this.movieData.Actors;
        this.displayContainer.appendChild(data);
      }
    }
    
    const baseUrl = 'MV5BMTQwMDU5NDkxNF5BMl5BanBnXkFtZTcwMjk5OTk4OQ@@._V1_SX300.jpg';
    const posterId = this.movieData.Poster; 
    const fullUrl = baseUrl.replace(/[^/]+$/, posterId); 

    const img = document.createElement('img');
    img.src = fullUrl; 
    this.displayContainer.appendChild(img);
  }

  clearDisplay() {
    this.displayContainer.innerHTML = '';
  }
}

const inputField = document.getElementById('movieInput');
const buttonClear = document.getElementById('clearMovie');

document.getElementById('film').addEventListener('click', function () {
  if (inputField.style.display === 'block') {
    const value = inputField.value;
    if (value) {
      const movieFetcher = new MovieFetcher('e5df209f');
      movieFetcher.fetchMovie(value).then(() => {
        movieFetcher.displayMovieData();
      });
    }
  } else {
    inputField.style.display = 'block';
    buttonClear.style.display = 'block';
  }
});

document.getElementById('clearMovie').addEventListener('click', function () {
  const movieFetcher = new MovieFetcher('e5df209f');
  movieFetcher.clearDisplay(); 
  inputField.value = '';
});


