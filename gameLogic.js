function changeButtons() {
  let allBtns = document.querySelectorAll('#btn-container>button');
  console.log('Change');
  allBtns.forEach(oneBtn => {
    oneBtn.classList.toggle('hidden');
  });
}

function computerPlay() {
  let numberSelection = Math.floor(Math.random() * 100) % 3;

  if (numberSelection == 0) {
    return 'rock';
  } else if (numberSelection == 1) {
    return 'paper';
  } else if (numberSelection == 2) {
    return 'scissors';
  } else {
    return 'Error';
  }
}

function displayResults(resultArr) {
  let playerScore = document.querySelector('#score-player');
  let computerScore = document.querySelector('#score-computer');
  let ties = document.querySelector('#score-ties');

  if (resultArr[1] == 2) {
    computerScore.textContent++;
  } else if (resultArr[1] == 3) {
    playerScore.textContent++;
  } else if (resultArr[1] == 1) {
    ties.textContent++;
  }

  let commentary = document.querySelector('#commentary');
  commentary.textContent = resultArr[0];
  
  if (computerScore.textContent == 5) {
    commentary.textContent += ` You have lost the game.`;
    changeButtons();
  } else if (playerScore.textContent == 5) {
    commentary.textContent += ` You have won the game!`;
    changeButtons();
  }
}

function oneRound(pChoice) {
  let computer = computerPlay();

  if (pChoice == computer) {
    return [`It's a tie! You and the computer both chose ${pChoice}.`, 1];
  } else if ((pChoice == 'rock' && computer == 'paper') || (pChoice == 'paper' && computer == 'scissors') || (pChoice == 'scissors' && computer == 'rock')) {
    return [`You have lost. You chose ${pChoice}, but the computer chose ${computer}.`, 2];
  } else if ((pChoice == 'rock' && computer == 'scissors') || (pChoice == 'paper' && computer == 'rock') || (pChoice == 'scissors' && computer == 'paper')) {
    return [`You have won! You chose ${pChoice} and the computer chose ${computer}.`, 3];
  } else {
    return [`Your selection of '${pChoice}' is not valid.`, 0];
  }
}

function resetGame() {
  document.querySelector('#score-player').textContent = 0;
  document.querySelector('#score-computer').textContent = 0;
  document.querySelector('#score-ties').textContent = 0;
  document.querySelector('#commentary').textContent = `Let's try again! Make your move.`;
  changeButtons();
}

let btns = document.querySelectorAll('.choices');
btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let result = oneRound(e.target.value);
    displayResults(result);
  });
});

let newGameButton = document.getElementById('btn-newGame').addEventListener('click', resetGame);