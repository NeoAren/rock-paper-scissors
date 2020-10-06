//
// Rock, paper and scissors game by Andras Adam
//

// Create scores and history variables
// const history = [];
const scores = { p: 0, c: 0 };

// DOM element variables
const pHand = document.querySelector('#pHand');
const cHand = document.querySelector('#cHand');
const pScoreDOM = document.querySelector('#pScore');
const cScoreDOM = document.querySelector('#cScore');
const buttons = document.querySelectorAll('.play button');

// Bind event listeners to all options
buttons.forEach((button) => {
    button.addEventListener('click', () => play(button.id));
});

// Play the game
const play = pChoice => {

    // Reset hands and disable buttons
    buttons.forEach(button => button.disable());
    pHand.src = 'assets/rock.png';
    cHand.src =  'assets/rock.png';

    // Get random computer choice
    const random = Math.floor(Math.random() * 3);
    const cChoice = ['rock', 'paper', 'scissors'][random];

    pHand.animate([
        { transform: 'scaleX(-1) rotate(0deg)' },
        { transform: 'scaleX(-1) rotate(40deg)' },
        { transform: 'scaleX(-1) rotate(0deg)' }
    ], { duration: 500, iterations: 3 });

    cHand.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(40deg)' },
        { transform: 'rotate(0deg)' }
    ], { duration: 500, iterations: 3 });


    // Update scores and display results
    setTimeout(() => {

        // Update hands and enable buttons
        pHand.src = 'assets/' + pChoice + '.png';
        cHand.src =  'assets/' + cChoice + '.png';
        buttons.forEach(button => button.disabled = false);

        // Calculate result and update scores
        const result = compare(pChoice, cChoice);
        if (result !== 0) scores[result === 1 ? 'p' : 'c']++;
        pScoreDOM.textContent = String(scores.p);
        cScoreDOM.textContent = String(scores.c);
        console.log(`P: ${pChoice} (${scores.p}), C: ${cChoice} (${scores.c})`);
    }, 1250);

};

// Compare x and y choices, 1 = x wins, -1 = x loses, 0 = tie
const compare = (x, y) => {
    const winConditions = [
        x === 'rock' && y === 'scissors', x === 'paper' && y === 'rock', x === 'scissors' && y === 'paper'
    ];
    return (winConditions[0] || winConditions[1] || winConditions[2]) ? 1 : x === y ? 0 : -1;
};
