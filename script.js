const start = document.querySelector('.start');

start.addEventListener('click', e => {
  e.target.style.display = 'none';

  document.querySelector('.operands').style.display = 'flex';
  document.querySelector('.options').style.display = 'flex';

  startTimer();
});

function reset() {
  time = 10;
  timer.textContent = time;
  startTimer();
  displayOperands();
  displayOptions();
}

const gameOver = document.querySelector('.gameOver');
const restart = document.querySelector('.restart');

restart.addEventListener('click', () => {
  gameOver.style.display = 'none';
  score.textContent = 0;
  range = 100;
  options.forEach(option => (option.disabled = false));
  reset();
});

const timer = document.querySelector('.timer');
let time = 10;
let timerID;

function startTimer() {
  function _startTimer() {
    if (!time) {
      clearInterval(timerID);
      gameOver.style.display = 'block';
      options.forEach(option => (option.disabled = true));
    }

    timer.textContent = time;
    time--;
  }
  _startTimer();

  timerID = setInterval(_startTimer, 1000);
}

let range = 100;
const randomNumber = () => Math.ceil(Math.random() * range);

const operands = document.querySelectorAll('.operands > span');

let operand1Value;
let operand2Value;

function displayOperands() {
  operand1Value = randomNumber();
  operand2Value = randomNumber();

  operands[0].textContent = operand1Value;
  operands[2].textContent = operand2Value;
}

displayOperands();

const options = document.querySelectorAll('.options button');

function displayOptions() {
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

displayOptions();

const score = document.querySelector('.score');
score.textContent = 0;

options.forEach(option =>
  option.addEventListener('click', e => {
    if (e.target.textContent == operand1Value + operand2Value) {
      score.textContent++;
      !(Number(score.textContent) % 10) && (range = range + 100);
      clearInterval(timerID);
      reset();
    } else {
      gameOver.style.display = 'block';
      clearInterval(timerID);
      options.forEach(option => (option.disabled = true));
    }
  })
);
