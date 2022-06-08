
//Gets inputs, returns 3 if there was an error, 0 for rock, 1 for paper and 2 for scissors
const buttons = document.querySelectorAll("button");

const title = document.querySelector(".title");
const txt = document.querySelector(".text");

let playerWins = 0;
let computerWins = 0;

updateScore();
console.log("cum")

buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        playRound(e.target.classList[0]);
    });
});

function updateScore () {

    const player = document.querySelector(".player");
    const computer = document.querySelector(".computer");

    player.textContent = String(playerWins);
    computer.textContent = String(computerWins);

    if ((playerWins > 4)||(computerWins > 4)) {
        gameEnd();
    }
}

function userConsolePlay () {
    let input = String(prompt("Choose Rock (r), Paper (p) or Scissors(s)"))

    //Any input is valid so long as it begins with r, p or s case insensitive
    switch (input[0]){
        case "r":
        case "R":
            return 0;
            break;
        case "p":
        case "P":
            return 1;
            break;
        case "s":
        case "S":
            return 2;
            break;
        default:
            console.log("Sorry, there was an error")
            return 3;
    }
}

function computerPlay () {
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

    if (((choice == R)&&(cC == S))||((choice == P)&&(cC == R))||((choice == S)&&(choice == P))) {
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
    if (playerWins > 4){
        setState(txt, "win");
        setState(title, "win");
        txt.textContent = "Well done!"
    } else {
        setState(txt, "lose");
        setState(title, "lose");
        txt.textContent = "Better luck next time..."
    }
}

//n is the number of rounds needed to complete a full game
// function playGame(curr = 0, n = 5) {
//     //If n has not been reached, it calls itself incrementing curr + plays a round
//     result = playRound() + (curr < n ? playGame(++curr,n) : 0);

//     if (result < 0) {
//         console.log("You lost...")
//     } else if (result > 0) {
//         console.log("You won!");
//     } else {
//         console.log("It's a tie... Somehow??")
//     }
//     return result;
// }

// playGame();