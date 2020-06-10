const gameOver = document.querySelector('.gameOver');
const restart = document.querySelector('.restart');

restart.addEventListener('click', () => {
  gameOver.style.display = 'none';
  time = 10;
  timer.textContent = time;
  score.textContent = 0;
  options.forEach(option => {
    option.disabled = false;
    option.style.backgroundColor = 'unset';
  });
  startTimer();
  operands();
  optionss();
});

const timer = document.querySelector('.timer');
let time = 10;
let startTimerr;

function startTimer() {
  function _startTimer() {
    if (!time) {
      clearInterval(startTimerr);
      gameOver.style.display = 'block';
      options.forEach(option => (option.disabled = true));
    }

    timer.textContent = time;
    time--;
  }
  _startTimer();

  startTimerr = setInterval(_startTimer, 1000);
}

startTimer();

const randomNumber = () => Math.ceil(Math.random() * 100);

function operands() {
  const operand1 = document.querySelector('.operand1');
  const operand2 = document.querySelector('.operand2');

  operand1Value = randomNumber();
  operand2Value = randomNumber();

  operand1.textContent = operand1Value;
  operand2.textContent = operand2Value;
}

operands();

const options = document.querySelectorAll('.option');

function optionss() {
  const correctOption = Math.floor(Math.random() * 4);

  options[correctOption].textContent = operand1Value + operand2Value;
  options[correctOption].style.backgroundColor = 'red';

  for (i = 0; i < 4; i++) {
    if (i !== correctOption) {
      options[i].textContent = randomNumber();

      while (options[i].textContent === options[correctOption].textContent) {
        options[i].textContent = randomNumber();
      }
    }
  }
}

optionss();

const score = document.querySelector('.score');
score.textContent = 0;

options.forEach(option =>
  option.addEventListener('click', e => {
    if (e.target.textContent == operand1Value + operand2Value) {
      score.textContent++;
      e.target.style.backgroundColor = 'unset';
      operands();
      optionss();
    } else {
      gameOver.style.display = 'block';
      clearInterval(startTimerr);
      options.forEach(option => (option.disabled = true));
    }
  })
);
