
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
