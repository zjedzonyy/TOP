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

const action = () => {
    const mySet = new Set();

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            // console.log(board[i][j]);
            if (board[i][j] === null) {
                mySet.add(`${i}, ${j}`);
                // console.log(`Added (${i},${j}) to mySet`);
            }
        }
    }
}

player();


// player function


// action function + check if it's valid

// result function


//winner function


//termina function


//utility function

