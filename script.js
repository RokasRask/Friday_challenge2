const rand = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

let secretNumber;
let guesses = 0;
const maxGuesses = 10;

function resetGame() {
    secretNumber = rand(1000, 9999).toString();
    guesses = 0;
    document.getElementById('results').innerHTML = '';
    document.getElementById('message').style.display = 'none';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false;
    console.log("Paslėptas skaičius: " + secretNumber); // debuginimui
}

function evaluateGuess(guess) {
    const guessStr = guess.toString();

    // Skaičiuojame correctDigits
    let correctDigits = 0;
    let correctPositions = 0;

    // Sukuriame masyvą, kuris žymės panaudotus skaitmenis
    const secretUsed = Array(secretNumber.length).fill(false);
    const guessUsed = Array(guessStr.length).fill(false);

    // Pirma iteracija - skaičiuojame correctPositions
    for (let i = 0; i < secretNumber.length; i++) {
        if (secretNumber[i] === guessStr[i]) {
            correctPositions++;
            secretUsed[i] = true;
            guessUsed[i] = true;
        }
    }

    // Antra iteracija - skaičiuojame correctDigits
    for (let i = 0; i < guessStr.length; i++) {
        if (!guessUsed[i]) {
            for (let j = 0; j < secretNumber.length; j++) {
                if (!secretUsed[j] && guessStr[i] === secretNumber[j]) {
                    correctDigits++;
                    secretUsed[j] = true;
                    break;
                }
            }
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

    if (result.correctPositions === 4) {
        document.getElementById('message').textContent = `Sveikiname! Jūs atspėjote skaičių: ${secretNumber}`;
        document.getElementById('message').className = 'alert alert-success';
        document.getElementById('message').style.display = 'block';
        document.getElementById('guessButton').disabled = true;
    } else if (guesses >= maxGuesses) {
        document.getElementById('message').textContent = `Spėjimai išnaudoti! Teisingas skaičius buvo: ${secretNumber}`;
        document.getElementById('message').className = 'alert alert-danger';
        document.getElementById('message').style.display = 'block';
        document.getElementById('guessButton').disabled = true;
    }

    guessInput.value = '';
});

document.getElementById('newGameButton').addEventListener('click', resetGame);

resetGame();