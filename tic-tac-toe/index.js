function gameBoard() {
    const X = "X";
    const O = "O";
    const EMPTY  = null;

    // initial state function
    function initialState(){
        return [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
            ];
    }

    return initialState();
}

const board = gameBoard();

// return whose next turn is, "X" or "O"
const player = () => {
    let countx = 0;
    let counto = 0;
    
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (board[i][j] === "X") {
                countx++;
            } else if (board[i][j] === "O") {
                counto++;
            }
        }
    }

    if (counto >= countx) {
        return "X";
    } else if (counto < countx) {
        return "O";
    }
}

// return set of available actions
const action = () => {
    const mySet = new Set();

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            // console.log(board[i][j]);
            if (board[i][j] === null) {
                mySet.add([i, j]);
                // console.log(`Added (${i},${j}) to mySet`);
            }
        }
    }
    return mySet;
}

// function isValidMove(prompt) {
//     const [x, y] = prompt.split(',').map(Number);
// }

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// ask for a move and update the table
const makeMove = () => {
    const whoseMove = player();

    
    let move = prompt(`${whoseMove} move, type coordinates [x,y]: `);
    const moveMade = move.split(',').map(Number);
    // const moveMade = new Set(moveArray);

    console.log(moveMade);
    const aveMoves = action();
    console.log(aveMoves);

    for (const value of aveMoves) {
        if (arraysEqual(moveMade, value)) {
            console.log("move is valid");
            board[moveMade[0]][moveMade[1]] = whoseMove;
            console.log(board);
        }
    }
    
}

const checkWinner = () => {
    // sprawdz poziomo 
    let countx = 0;
    let counto = 0;

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (board[i][j] === "X") {
                countx++;
                console.log("Punkt dla X");
            } else if (board[i][j] === "O"){
                counto++;
                console.log("punkt dla O");
            }
        if (countx === 3) {
            console.log("Wygral X poziomo")
            return "X";
        } else if (counto === 3) {
            console.log("Wygral O poziomo")
            return "O";
        }
        }
        countx = 0;
        counto = 0;

    }

    // sprawdz pionowo 
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (board[j][i] === "X") {
                countx++;
                console.log("Punkt dla X");
            } else if (board[j][i] === "O"){
                counto++;
                console.log("punkt dla O");
            }
        if (countx === 3) {
            console.log("Wygral X pionowo");
            return "X";
        } else if (counto === 3) {
            console.log("Wygral O pionowo");
            return "O";
        }
        }
        countx = 0;
        counto = 0;

    }
    // sprawdz po skosie 
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] != null) {
        console.log(board[0][0]);
        return (board[0][0]);
    } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[0][2] != null) {
        console.log(`The winner is ${board[0][0]}`);
        return (board[2][0]);
    }

    // sprawdz remis
    const aveMoves = action();

    if (aveMoves.size === 0) {
        return "Tie";
    }

    // brak zwyciezcy 
    return null;
}

const playGame = () => {
    const board = gameBoard();
    let winner = checkWinner()
    console.log(winner);
    while (winner === null) {
        makeMove();
        winner = checkWinner();
    }
    console.log(winner);
}



// TODO: poprawić co ktora funkcja zwraca i dopiescic
// TODO: set screenController()