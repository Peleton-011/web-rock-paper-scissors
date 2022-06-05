
//Gets inputs, returns 1 if there was an error, 2 for rock, 3 for paper and 4 for scissors

function getInput () {
    let input = String(prompt("Choose Rock (r), Paper (p) or Scissors(s)"))

    switch (input[0]){
        case "r":
        case "R":
            return 2;
            break;
        case "p":
        case "P":
            return 3;
            break;
        case "s":
        case "S":
            return 4;
            break;
        default:
            console.log("Sorry, there was an error")
            return 1;
    }
}