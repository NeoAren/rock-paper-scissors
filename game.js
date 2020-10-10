//
// Rock, paper and scissors game by András Ádám
//

// Declare scores and history variables
let scores, history;

// DOM element variables
const title = document.querySelector('#title');
const result = document.querySelector('#result');
const pHand = document.querySelector('#pHand');
const cHand = document.querySelector('#cHand');
const pScoreDOM = document.querySelector('#pScore');
const cScoreDOM = document.querySelector('#cScore');
const startButton = document.querySelector('#start');
const restartButton = document.querySelector('#restart');
const playButtons = document.querySelectorAll('.buttons button');
const startSection = document.querySelector('#start-section');
const gameSection = document.querySelector('#game-section');
const endSection = document.querySelector('#end-section');

// Setting up event listeners
startButton.addEventListener('click', () => start());
restartButton.addEventListener('click', () => start());
playButtons.forEach((button) => {
   button.addEventListener('click', () => play(button.id));
});

// Setup/reset the play area, scores and history
const start = () => {
   scores = { p: 0, c: 0 };
   history = { winner: null, count: 1 };
   pScoreDOM.textContent = '0';
   cScoreDOM.textContent = '0';
   result.textContent = '';
   title.textContent = 'Let\'s get started!';
   startSection.style.display = 'none';
   endSection.style.display = 'none';
   gameSection.style.display = 'flex';
   pHand.src = 'assets/rock.png';
   cHand.src =  'assets/rock.png';
};

// Play the game
const play = pChoice => {

   // Set hand images to rock and disable buttons
   pHand.src = 'assets/rock.png';
   cHand.src =  'assets/rock.png';
   playButtons.forEach(button => button.disabled = true);

   // Calculate random computer choice
   const random = Math.floor(Math.random() * 3);
   const cChoice = ['rock', 'paper', 'scissors'][random];

   // Hand animations
   animatePlayerHand();
   animateComputerHand();

   // Update scores and display results
   setTimeout(() => {

      // Update hands and enable buttons again
      pHand.src = 'assets/' + pChoice + '.png';
      cHand.src =  'assets/' + cChoice + '.png';
      playButtons.forEach(button => button.disabled = false);

      // Compare hands and find winner
      const result = compare(pChoice, cChoice);
      const winner = result ? result === 1 ? 'player' : 'computer' : null;

      // Update scores and history
      if (winner) scores[winner === 'player' ? 'p' : 'c']++;
      history.count = winner && history.winner === winner ? history.count + 1 : 1;
      history.winner = winner;

      // Display results
      pScoreDOM.textContent = String(scores.p);
      cScoreDOM.textContent = String(scores.c);
      title.textContent = winner ? winner + ' wins!' : 'It\'s a tie!';

      // Check for end of game
      if (history.count === 3 || scores.c === 10 || scores.p === 10) end();
   }, 1250);
};

// End the game
const end = () => {
   gameSection.style.display = 'none';
   endSection.style.display = 'flex';
   const winnerScore = scores[history.winner === 'player' ? 'p' : 'c'];
   const loserScore = scores[history.winner === 'player' ? 'c' : 'p'];
   result.textContent = `${history.winner} won ${winnerScore} to ${loserScore}!`;
};

// Compare x and y choices, 1 = x wins, -1 = x loses, 0 = tie
const compare = (x, y) => {
   const winConditions = [
      x === 'rock' && y === 'scissors', x === 'paper' && y === 'rock', x === 'scissors' && y === 'paper'
   ];
   return (winConditions[0] || winConditions[1] || winConditions[2]) ? 1 : x === y ? 0 : -1;
};

// Shake animation on player hand
const animatePlayerHand = () => {
   pHand.animate([
      { transform: 'scaleX(-1) rotate(0deg)' },
      { transform: 'scaleX(-1) rotate(40deg)' },
      { transform: 'scaleX(-1) rotate(0deg)' }
   ], { duration: 500, iterations: 3 });
};

// Shake animation on computer hand
const animateComputerHand = () => {
   cHand.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(40deg)' },
      { transform: 'rotate(0deg)' }
   ], { duration: 500, iterations: 3 });
};
