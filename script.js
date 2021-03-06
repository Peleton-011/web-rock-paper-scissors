
//Gets inputs, returns 3 if there was an error, 0 for rock, 1 for paper and 2 for scissors
const buttons = document.querySelectorAll("button");

const title = document.querySelector(".title");
const txt = document.querySelector(".text");

let playerWins = 0;
let computerWins = 0;

updateScore();

buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        playRound(e.target.classList[0]);
    });
});

function updateScore() {

    const player = document.querySelector(".player");
    const computer = document.querySelector(".computer");

    player.textContent = String(playerWins);
    computer.textContent = String(computerWins);

    if ((playerWins > 4) || (computerWins > 4)) {
        gameEnd();
    }
}

function computerPlay() {
    //Random number from 0 to 1, cut to 3 decimal places, times 1000, modulo 3, so we get [0,2]
    let choice = (Math.random().toFixed(3) * 1000) % 3;
    return choice;
}

function playRound(choice) {

    switch (choice) {
        case "rock":
            choice = 0;
            break;
        case "paper":
            choice = 1;
            break;
        case "scissors":
            choice = 2;
            break;
        default:
            choice = computerPlay();

    }

    let cC = computerPlay();

    //This is like an enum:

    let R = 0;
    let P = 1;
    let S = 2;

    //Evaluates who wins

    if (((choice == R) && (cC == S)) || ((choice == P) && (cC == R)) || ((choice == S) && (choice == P))) {
        playerWin(choice, cC);
        return;
    } else if (choice == cC) {
        playerTie(choice);
        return;
    } else {
        playerLose(choice, cC);
        return;
    }
}

function setState(node, state) {
    switch (state) {
        case "win":
            node.classList.remove("lose");
            node.classList.add("win");
            break;
        case "lose":
            node.classList.remove("win");
            node.classList.add("lose");
            break;
        default:
            node.classList.remove("lose");
            node.classList.remove("win");
    }
}

function playerWin(player, computer) {
    title.textContent = "You win! "
    txt.textContent = choiceToText(player) + " beats " + choiceToText(computer) + "!";
    playerWins += 1;
    setState(title, "win");
    setState(txt, "win");
    updateScore();
}

function playerLose(player, computer) {
    title.textContent = "You lose! "
    txt.textContent = choiceToText(computer) + " beats " + choiceToText(player) + "!";
    computerWins += 1;
    setState(title, "lose");
    setState(txt, "lose");
    updateScore();
}

function playerTie(player) {
    title.textContent = "It's a tie!"
    txt.textContent = "You both chose " + choiceToText(player) + "!";
    setState(title);
    setState(txt);
}

function choiceToText(choice) {
    switch (choice) {
        case 0:
            return "Rock";
            break;
        case 1:
            return "Paper";
            break;
        case 2:
            return "Scissors";
            break;
        default:
            "ERROR"
    }
}

function gameEnd() {
    if (playerWins > 4) {
        setState(txt, "win");
        setState(title, "win");
        txt.textContent = "Well done!"
    } else {
        setState(txt, "lose");
        setState(title, "lose");
        txt.textContent = "Better luck next time..."
    }
    buttons.forEach(btn => btn.parentNode.removeChild(btn));

    const replayBtn = document.createElement("button");
    makeBtn(replayBtn, "replay", "Press here to play again");

    replayBtn.addEventListener("click", reset);
}

function reset() {

    playerWins = 0;
    computerWins = 0;
    setState(title);
    setState(txt);

    txt.textContent = "Press any button to make your choice";
    title.textContent = "Choose";

    const btnDiv = document.querySelector(".buttons");

    btnDiv.childNodes.forEach(child => {
        btnDiv.removeChild(child);
    });

    buttons.forEach(btn => {
        btnDiv.appendChild(btn);
    });

    updateScore();
}

function makeBtn(btn, className, text) {
    btn.classList.add(className);
    btn.textContent = text;
    document.querySelector(".buttons").appendChild(btn);
}
