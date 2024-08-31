class Counter {
  constructor() {
    this.INITIAL_TEMPERATURE = 25;
    this.INITIAL_HUMIDITY = 50;

    this.buttonIncreaseTemperature = document.querySelector('#increment-temperature');
    this.buttonReduceTemperature = document.querySelector('#decrement-temperature');

    this.buttonIncreaseHumidity = document.querySelector('#increment-humidity');
    this.buttonReduceHumidity = document.querySelector('#decrement-humidity');

    this.temperatureTitle = document.querySelector('.temperature__title');
    this.humidityTitle = document.querySelector('.humidity__title');

    this.temperatureBar = document.querySelector('#temperature-bar');
    this.humidityBar = document.querySelector('#humidity-bar');

    this.counterTemperature = this.INITIAL_TEMPERATURE;
    this.counterHumidity = this.INITIAL_HUMIDITY;

    this.init();
  }

  init() {
    this.buttonIncreaseTemperature.addEventListener('click', () => this.incrementTemperature());
    this.buttonReduceTemperature.addEventListener('click', () => this.decrementTemperature());

    this.buttonIncreaseHumidity.addEventListener('click', () => this.incrementHumidity());
    this.buttonReduceHumidity.addEventListener('click', () => this.decrementHumidity());

    this.temperatureBar.addEventListener('input', (event) => this.setTemperature(event.target.value));
    this.humidityBar.addEventListener('input', (event) => this.setHumidity(event.target.value));

    this.temperatureBar.value = this.counterTemperature;
    this.humidityBar.value = this.counterHumidity;

    this.updateTitles();
  }

  incrementTemperature() {
    this.counterTemperature++;
    this.updateTitles();
    this.temperatureBar.value = this.counterTemperature;
  }

  decrementTemperature() {
    if (this.counterTemperature > 0) {
      this.counterTemperature--;
      this.updateTitles();
      this.temperatureBar.value = this.counterTemperature;
    }
  }

  incrementHumidity() {
    this.counterHumidity++;
    this.updateTitles();
    this.humidityBar.value = this.counterHumidity;
  }

  decrementHumidity() {
    if (this.counterHumidity > 0) {
      this.counterHumidity--;
      this.updateTitles();
      this.humidityBar.value = this.counterHumidity;
    }
  }

  setTemperature(value) {
    this.counterTemperature = value;
    this.updateTitles();
  }

  setHumidity(value) {
    this.counterHumidity = value;
    this.updateTitles();
  }

  updateTitles() {
    this.temperatureTitle.textContent = `Temperature ${this.counterTemperature} t°`;
    this.humidityTitle.textContent = `Humidity ${this.counterHumidity}%`;
  }
}

const counter = new Counter();