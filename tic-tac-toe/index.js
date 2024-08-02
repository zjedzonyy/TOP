// IIFE to create a game board module
const gameBoard = (() => {
    const EMPTY = null;
    let board = initialState();

    // Initial state of the board
    function initialState() {
        return [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ];
    }

    // Get current board state
    const getBoard = () => board;
    // Reset the board to initial state
    const resetBoard = () => board = initialState();
    // Set a field on the board
    const setField = (x, y, player) => board[x][y] = player;

    const isBoardEmpty = () => {
        return board.every(row => row.every(cell => cell === EMPTY));
    };

    return { getBoard, resetBoard, setField, isBoardEmpty };
})();

// Player factory function
const Player = (name, sign) => {
    const getName = () => name;
    const getSign = () => sign;

    return { getName, getSign };
};

// IIFE to create a game controller module
const gameController = (() => {
    let player1 = Player('Player1', 'X');
    let player2 = Player('Player2', 'O');
    let currentPlayer = player1;

    // Set player names
    const setPlayerNames = (name1, name2) => {
        player1 = Player(name1, 'X');
        player2 = Player(name2, 'O');
        currentPlayer = player1;
    };

    // Switch the current player
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    // Get the current player
    const getCurrentPlayer = () => currentPlayer;

    // Make a move on the board
    const makeMove = (x, y) => {
        if (gameBoard.getBoard()[x][y] === null) {
            gameBoard.setField(x, y, currentPlayer.getSign());
            switchPlayer();
        }
    };

    // Check for a winner
    const checkWinner = (board) => {
        const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a[0]][a[1]] && board[b[0]][b[1]] === board[a[0]][a[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
                const winner = (board[a[0]][a[1]] === player1.getSign()) ? player1 : player2;

                return winner;
            }
        }

        const emptyFields = board.flat().some(cell => cell === null);
        if (!emptyFields) {
            return "Tie";
        }

        return null;
    };

    return { setPlayerNames, getCurrentPlayer, switchPlayer, makeMove, checkWinner };
})();

// IIFE to create a display controller module
const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const playerForm = document.getElementById('playerForm');
    const startButton = document.getElementById('submit');
    const restartButton = document.getElementById('restart');
    const winnerDiv = document.querySelector('.winner');
    let player1Name = '';
    let player2Name = '';

    // Handle player form submission
    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        player1Name = document.getElementById('player1').value;
        player2Name = document.getElementById('player2').value;

        startGame(player1Name, player2Name);
    });

    // Reset winner display
    

    // Handle game restart
    restartButton.addEventListener('click', () => {
        resetGame();
    });

    // Update the board display
    const updateBoard = () => {
        cells.forEach(cell => {
            const x = cell.getAttribute('data-x');
            const y = cell.getAttribute('data-y');
            const btn = cell.querySelector('button');
            btn.textContent = gameBoard.getBoard()[x][y];    
            
            if (gameBoard.getBoard()[x][y] !== null) {
                btn.disabled = true;
            } else {
                btn.disabled = false;
            }
        });
    };

    // Display the winner
    const showWinner = (winner) => {
        if (winner) {
            winnerDiv.textContent = `The winner is ${winner.getName()}`;
        } else {
            winnerDiv.textContent = '';
        }

    }

    // Show the current player's turn
    const showTurn = () => {
        const turnDiv = document.getElementById('turn');
        turnDiv.textContent = `${gameController.getCurrentPlayer().getName()}'s turn`;
    }

    // Set up event listeners for cell buttons
    const setupEventListeners = () => {
        cells.forEach(cell => {
            const x = cell.getAttribute('data-x');
            const y = cell.getAttribute('data-y');
            const btn = cell.querySelector('button');
            btn.addEventListener('click', () => {
                showTurn();
                gameController.makeMove(x, y);
                updateBoard();
                const winner = gameController.checkWinner(gameBoard.getBoard());
                if (winner) {
                    const turnDiv = document.getElementById('turn');
                    turnDiv.textContent = '';
                    showWinner(winner);
                    cells.forEach(cell => {
                        const btn = cell.querySelector('button');
                        btn.disabled = true;
                    });
                } 
            });
        });
    }

    return { updateBoard, showWinner, setupEventListeners, showTurn };
})();

// Start the game with initial player names
const startGame = (player1Name, player2Name) => {
    if (gameBoard.isBoardEmpty()){
        gameController.setPlayerNames(player1Name, player2Name);
        displayController.setupEventListeners();
        displayController.updateBoard();
        displayController.showTurn();
    }

}

// Reset the game
const resetGame = () => {
    gameBoard.resetBoard();
    displayController.updateBoard();
    displayController.setupEventListeners();
    displayController.showTurn();
    displayController.showWinner();
}

// Start the game with default player names
// startGame('Player1', 'Player2');

// Fix resetGame and set default values for players nicknames. TODO: Improve Frontend.