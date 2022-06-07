
//Gets inputs, returns 3 if there was an error, 0 for rock, 1 for paper and 2 for scissors
const buttons = document.querySelectorAll("button");

let playerWins = 0;
let computerWins = 0;

buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        playRound(e.target.classList[0]);
    });
});

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
        playerWins += 1;
        return;
    } else if (choice == cC) {
        playerTie(choice);
        return;
    } else {
        playerLose(choice, cC);
        computerWins += 1;
        return;
    }
    
}

function playerWin(player, computer) {
    let result = "You win! "
    result = result.concat(choiceToText(player), " beats ", choiceToText(computer), "!")
    console.log(result)
}

function playerLose(player, computer) {
    let result = "You lose! "
    result = result.concat(choiceToText(computer), " beats ", choiceToText(player), "!")
    console.log(result)
}

function playerTie(player) {
    let result = "It's a tie! "
    result = result.concat(" You both chose ", choiceToText(player),"!")
    console.log(result)
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