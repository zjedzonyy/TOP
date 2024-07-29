(() => {
    document.addEventListener('DOMContentLoaded', () => {
        let player1Name = '';
        let player2Name = '';
        const playerForm = document.getElementById('playerForm');
        const startButton = document.getElementById('submit');
        const gameBoard = document.getElementById('gameBoard');
        let board;

        playerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (startButton.textContent === "Start Game") {
                player1Name = document.getElementById('player1').value;
                player2Name = document.getElementById('player2').value;
                startGame();
            } else {
                resetGame();
            }
        });

        const startGame = () => {
            board = gameBoardState();
            updateButtons();
            screenController();
            startButton.textContent = "Restart Game";
        };

        const resetGame = () => {
            board = gameBoardState();
            updateButtons();
            screenController();
            startButton.textContent = "Restart Game";
        };

        const gameBoardState = () => {
            const EMPTY = null;

            function initialState() {
                return [
                    [EMPTY, EMPTY, EMPTY],
                    [EMPTY, EMPTY, EMPTY],
                    [EMPTY, EMPTY, EMPTY]
                ];
            }

            return initialState();
        };

        // Determine whose turn it is
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
            } else {
                return "O";
            }
        };

        // Get the set of available moves
        const action = () => {
            const mySet = new Set();

            for (let i = 0; i <= 2; i++) {
                for (let j = 0; j <= 2; j++) {
                    if (board[i][j] === null) {
                        mySet.add([i, j]);
                    }
                }
            }
            return mySet;
        };

        // Check if two arrays are equal
        function arraysEqual(arr1, arr2) {
            if (arr1.length !== arr2.length) return false;
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true;
        }

        // Make a move on the board
        const makeMove = (x, y) => {
            x = Number(x);
            y = Number(y);
            const whoseMove = player();
            const moveMade = [x, y];
            const aveMoves = action();

            for (const value of aveMoves) {
                if (arraysEqual(moveMade, value)) {
                    board[moveMade[0]][moveMade[1]] = whoseMove;
                }
            }
            screenController();
        };

        // Check if there is a winner
        const checkWinner = () => {
            let countx = 0;
            let counto = 0;

            // Check horizontal lines
            for (let i = 0; i <= 2; i++) {
                for (let j = 0; j <= 2; j++) {
                    if (board[i][j] === "X") {
                        countx++;
                    } else if (board[i][j] === "O"){
                        counto++;
                    }
                if (countx === 3) {
                    return player1Name;
                } else if (counto === 3) {
                    return player2Name;
                }
                }
                countx = 0;
                counto = 0;
            }

            // Check vertical lines
            for (let i = 0; i <= 2; i++) {
                for (let j = 0; j <= 2; j++) {
                    if (board[j][i] === "X") {
                        countx++;
                    } else if (board[j][i] === "O"){
                        counto++;
                    }
                if (countx === 3) {
                    return player1Name;
                } else if (counto === 3) {
                    return player2Name;
                }
                }
                countx = 0;
                counto = 0;
            }

            // Check diagonals
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] != null) {
                return board[0][0] === "X" ? player1Name : player2Name;
            } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[0][2] != null) {
                return board[2][0] === "X" ? player1Name : player2Name;
            }

            const aveMoves = action();
            if (aveMoves.size == 0) {
                return "Tie";
            }

            return null;
        };

        // Update the screen with the current state of the game
        function screenController() {
            const playerTurnDiv = document.querySelector('.turn');
            const cells = document.querySelectorAll('.cell');
            const winnerDiv = document.querySelector('.winner');

            const whoseMove = player();
            playerTurnDiv.textContent = `${whoseMove}'s turn`;
            const winner = checkWinner();

            cells.forEach(cell => {
                const x = cell.getAttribute('data-x');
                const y = cell.getAttribute('data-y');
                const button = cell.querySelector('button');
                button.textContent = board[x][y];
                if (board[x][y] !== null) {
                    button.classList.add('disabled');
                    button.disabled = true;
                } else {
                    button.classList.remove('disabled');
                    button.disabled = false;
                }
            });
            
            if (winner !== null) {
                winnerDiv.textContent = `The winner is ${winner}!`;
                cells.forEach(cell => {
                    const button = cell.querySelector('button');
                    playerTurnDiv.textContent = "";
                    button.classList.add('disabled');
                    button.disabled = true;
                });
            }
            
        }

        // Add event listeners to the buttons
        function updateButtons() {
            document.querySelectorAll('.cell button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const cell = event.target.parentElement;
                    const x = cell.getAttribute('data-x');
                    const y = cell.getAttribute('data-y');
                    makeMove(x, y);
                    screenController();
                });
            });
        }
    });
})();
