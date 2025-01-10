const rand = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

let secretNumber;
let guesses = 0;
const maxGuesses = 10;
const message = document.getElementById('message');
message.textContent = `Likę galimi spėjimai: ${maxGuesses - guesses}`;

function resetGame() {
    secretNumber = rand(1000, 9999).toString();
    guesses = 0;
    document.getElementById('results').innerHTML = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false;
    console.log("Paslėptas skaičius: " + secretNumber); // debuginimui
}

function evaluateGuess(guess) {
    const guessStr = guess.toString();

    let correctDigits = 0;
    let correctPositions = 0;

    const secretUsed = Array(secretNumber.length).fill(false);
    const guessUsed = Array(guessStr.length).fill(false);

    for (let i = 0; i < guessStr.length; i++) {
        for (let j = 0; j < secretNumber.length; j++) {
            if (!secretUsed[j] && !guessUsed[i] && guessStr[i] === secretNumber[j]) {
                correctDigits++;
                secretUsed[j] = true;
                guessUsed[i] = true;
                break;
            }
        }
    }

    for (let i = 0; i < secretNumber.length; i++) {
        if (secretNumber[i] === guessStr[i]) {
            correctPositions++;
        }
    }

    return { correctDigits, correctPositions };
}

document.getElementById('guessButton').addEventListener('click', () => {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value;

    if (guess.length !== 4 || isNaN(guess)) {
        alert('Įveskite keturženklį skaičių.');
        return;
    }

    guesses++;
    const result = evaluateGuess(guess);

    const resultItem = document.createElement('li');
    resultItem.className = 'list-group-item';
    resultItem.textContent = `Spėjimas: ${guess} - Teisingi skaitmenys: ${result.correctDigits}, Vietoje: ${result.correctPositions}`;
    document.getElementById('results').appendChild(resultItem);
    message.textContent = `Likę galimi spėjimai: ${maxGuesses - guesses}`;

    if (result.correctPositions === 4) {
        message.textContent = `Sveikiname! Jūs atspėjote skaičių: ${secretNumber}`;
        message.className = 'alert alert-success';
        document.getElementById('guessButton').disabled = true;
    } else if (guesses >= maxGuesses) {
        message.textContent = `Spėjimai išnaudoti! Teisingas skaičius buvo: ${secretNumber}`;
        message.className = 'alert alert-danger';
        document.getElementById('guessButton').disabled = true;
    }

    guessInput.value = '';
});

document.getElementById('newGameButton').addEventListener('click', resetGame);

resetGame();