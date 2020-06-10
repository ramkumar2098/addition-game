const gameOver = document.querySelector('.gameOver');
const restart = document.querySelector('.restart');

restart.addEventListener('click', () => {
  gameOver.style.display = 'none';
  time = 10;
  timer.textContent = time;
  score.textContent = 0;
  options.forEach(option => {
    option.disabled = false;
  });
  startTimer();
  operands();
  _options();
});

const timer = document.querySelector('.timer');
let time = 10;
let startTimerr;

function startTimer() {
  function _startTimer() {
    if (!time) {
      clearInterval(startTimerr);
      gameOver.style.display = 'grid';
      options.forEach(option => (option.disabled = true));
    }

    timer.textContent = time;
    time--;
  }
  _startTimer();

  startTimerr = setInterval(_startTimer, 1000);
}

startTimer();

let range = 100;
const randomNumber = () => Math.ceil(Math.random() * range);

function operands() {
  const operand1 = document.querySelector('.operand1');
  const operand2 = document.querySelector('.operand2');

  operand1Value = randomNumber();
  operand2Value = randomNumber();

  operand1.textContent = operand1Value;
  operand2.textContent = operand2Value;
}

operands();

const options = document.querySelectorAll('.options > button');

function _options() {
  const correctOption = Math.floor(Math.random() * 4);

  options[correctOption].textContent = operand1Value + operand2Value;

  for (i = 0; i < 4; i++) {
    if (i !== correctOption) {
      options[i].textContent = randomNumber();

      while (options[i].textContent === options[correctOption].textContent) {
        options[i].textContent = randomNumber();
      }
    }
  }
}

_options();

const score = document.querySelector('.score');
score.textContent = 0;

options.forEach(option =>
  option.addEventListener('click', e => {
    if (e.target.textContent == operand1Value + operand2Value) {
      score.textContent++;
      !(Number(score.textContent) % 10) && (range = range + 100);
      clearInterval(startTimerr);
      time = 10;
      timer.textContent = time;
      startTimer();
      operands();
      _options();
    } else {
      gameOver.style.display = 'grid';
      clearInterval(startTimerr);
      options.forEach(option => (option.disabled = true));
    }
  })
);
