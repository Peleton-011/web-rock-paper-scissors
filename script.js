
//Gets inputs, returns 3 if there was an error, 0 for rock, 1 for paper and 2 for scissors

function userPlay () {
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

function playRound() {
    let pC = userPlay();
    //If there's an error two times, the program chooses at random
    pC = pC == 3 ? userPlay() : computerPlay();
    let cC = computerPlay();

    //This is like an enum:
    
    let R = 0;
    let P = 1;
    let S = 2;

    //Evaluates who wins

    if (((pC == R)&&(cC == S))||((pC == P)&&(cC == R))||((pC == S)&&(pC == P))) {
        playerWin(pC, cC);
    } else if (pC == cC) {
        playerTie(pC);
    } else {
        playerLose(pC, cC);
    }
    
}

function playerWin(player, computer) {
    let result = "You win! "
    result = result.concat(choiceToText(player), " beats ", choiceToText(computer), "!")
}

function playerLose(player, computer) {
    let result = "You lose! "
    result = result.concat(choiceToText(computer), " beats ", choiceToText(player), "!")
}

function playerTie(player) {
    let result = "It's a tie! "
    result = result.concat(" You both chose ", choiceToText(player),"!")
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