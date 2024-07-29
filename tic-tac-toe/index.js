function gameBoard() {
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
        console.log("X's turn is now");
        return "X";
    } else if (counto < countx) {
        console.log("Y turn is now");
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
const makeMove = (x,y) => {
    x = Number(x);
    y = Number(y);
    console.log(`Proba ruchu na pozycji: ${x} ${y}`);
    const whoseMove = player();
    console.log(`Ruch gracza: ${whoseMove}`);
    const moveMade = [x, y];
    
    // let move = prompt(`${whoseMove} move, type coordinates [x,y]: `);
    // const moveMade = move.split(',').map(Number);
    // const moveMade = new Set(moveArray);

    const aveMoves = action();

    for (const value of aveMoves) {
        if (arraysEqual(moveMade, value)) {
            console.log("move is valid");
            board[moveMade[0]][moveMade[1]] = whoseMove;
            console.log("Stan planszy po ruchu:", board);
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
            } else if (board[i][j] === "O"){
                counto++;
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
            } else if (board[j][i] === "O"){
                counto++;
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
    console.log(aveMoves);
    if (aveMoves.size == 0) {
        console.log("tie");
        return "Tie";
    }

    // brak zwyciezcy 
    console.log("No winner yet!");
    return null;
}

const playGame = () => {
    first_player = document.get
    updateButtons();
    screenController();

}


function screenController() {
    const playerTurnDiv = document.querySelector('.turn');
    const cells = document.querySelectorAll('.cell');
    const boardDiv = document.querySelector('.board');
    const winnerDiv = document.querySelector('.winner');

    // get the newest version of the board and player turn
    const whoseMove = player();
    playerTurnDiv.textContent = `${whoseMove}'s turn`
    const winner = checkWinner();
    if (winner !== null) {
        winnerDiv.textContent = `Thew inner is${winner}!`;
        //disable all buttons?
    }

    // update GUI X, O or NULL
    cells.forEach(cell => {
        const x = cell.getAttribute('data-x');
        const y = cell.getAttribute('data-y');
        const button = cell.querySelector('button');
        button.textContent = board[x][y];
        if (board[x][y] !==  null || winner !== null) {
            button.classList.add('disabled');
            button.disabled = true;        
        }
        
    })

}


function updateButtons() {
    const cells = document.querySelectorAll('.cell button').forEach(button => {
        button.addEventListener('click', (event) => {
            const cell = event.target.parentElement;
            const x = cell.getAttribute('data-x'); 
            const y = cell.getAttribute('data-y'); 
            makeMove(x, y);
            checkWinner();
            screenController();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let player1Name = '';
    let player2Name = '';
    const playerForm = document.getElementById('playerForm');
    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        player1Name = document.getElementById('player1').value;
        player2Name = document.getElementById('player2').value;
        playGame();
    })


})





// ulozono logike - sprwadzanie winner i screencontroller update do kazdego updatebuttons
// dodano wyswietlanie wygranego na ekranie.
// wylaczono mozliwosc dalszego grania po wylonieniu zwyciezcy 

// TODO: 1. Zmienic funkcje zeby uzywaly nickow dostarczonych z formularza.
//       2. Include a button to start/restart the game