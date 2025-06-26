// shortcuts
const log = console.log;

const gameBoard = (function () {
    const ROWS = 3;
    const COLUMNS = 3;
    let board = [];

    function convertCell(cell) {
        // convert cellID into coordinates
        switch (String(cell)) {
            case "1":
                return [0, 0];
            case "2":
                return [0, 1];
            case "3":
                return [0, 2];
            case "4":
                return [1, 0];
            case "5":
                return [1, 1];
            case "6":
                return [1, 2];
            case "7":
                return [2, 0];
            case "8":
                return [2, 1];
            case "9":
                return [2, 2];
        }
    }

    // public methods
    return {
        regenerateBoard: () => {
            board = [];
            for (let i = 0; i < ROWS; i++) {
                // the row elements will be arrays
                board[i] = [];
                for (let j = 0; j < COLUMNS; j++) {
                    board[i].push("_");
                }
            }
        },
        printBoard: function () {
            log("Current Board:")
            for (let row of board) {
                let line = "";
                for (let item of row) {
                    line += `${item} `;
                }
                log(line);
            }
        },
        getBoard: function () {
            return board
        },
        placeMark: (cell, mark) => {
            const [row, col] = convertCell(cell);
            board[row][col] = mark;
        },
        isValidLocation: (cell) => {
            // if the provided cell is empty,
            const [row, col] = convertCell(cell);
            if (board[row][col] === "_") {
                return true;
            }
            return false;
        },
        checkWinner: function (mark) {

            // 1 2 3
            // 4 5 6
            // 7 8 9

            // (1-2-3), (1-4-7), (1-5-9) win checks
            if (board[0][0] === mark) { // 1
                if (board[0][1] === mark) { // 2
                    if (board[0][2] === mark) { // 3
                        return true;
                    }

                }
                if (board[1][0] === mark) { // 4
                    if (board[2][0] === mark) { // 7
                        return true;
                    }
                }
                if (board[1][1] === mark) { // 5
                    if (board[2][2] === mark) { // 9
                        return true;
                    }
                }
            }

            // (2-5-8) win check
            if (board[0][1] === mark) { // 2
                if (board[1][1] === mark) { // 5
                    if (board[2][1] === mark) { // 8
                        return true;
                    }
                }
            }

            // (4-5-6) win check
            if (board[1][0] === mark) { // 4
                if (board[1][1] === mark) { // 5
                    if (board[1][2] === mark) { // 6
                        return true;
                    }
                }
            }

            // (3-5-7), (3,6,9) win checks
            if (board[0][2] === mark) { // 3
                if (board[1][1] === mark) { // 5
                    if (board[2][0] === mark) { // 7
                        return true;
                    }
                }
                if (board[1][2] === mark) { // 6
                    if (board[2][2] === mark) { // 9
                        return true;
                    }
                }
            }

            // (7-8-9) win check
            if (board[2][0] === mark) { // 7
                if (board[2][1] === mark) { // 8
                    if (board[2][2] === mark) { // 9
                        return true;
                    }
                }
            }
            return false;
        },
    }
})();

const displayController = (function () {

    // grab a reference to our gameOver text
    let gameOverText = document.querySelector('.gameOverText');

    // select the board from the dom
    const boardContainer = document.querySelector('.board');

    // reset button
    const startGameButton = document.querySelector('.setup');
    startGameButton.addEventListener('click', () => {
        gameFlow.setupGame();
        boardContainer.classList.replace('starting-board', 'player1-board');
    });

    let updatePlayerWinsDisplay = (player) => {
        let p1Wins = document.querySelector('.p1-wins');
        let p2Wins = document.querySelector('.p2-wins');

        if (player.getNum() === 1) {
            p1Wins.textContent = `Wins: ${player.getWins()}`;
        } else {
            p2Wins.textContent = `Wins: ${player.getWins()}`;

        }
    };

    // change player name
    let p1ChangeName = document.querySelector('.p1-change-name');
    let p2ChangeName = document.querySelector('.p2-change-name');

    p1ChangeName.addEventListener('click', () => {
        let newName = prompt("Enter a new name for the first player: ", "Player 1");
        gameFlow.getPlayer1().setName(newName);

        // select the player name display
        let p1NameDisplay = document.querySelector('.p1NameDisplay');
        p1NameDisplay.textContent = newName;
    });

    p2ChangeName.addEventListener('click', () => {
        let newName = prompt("Enter a new name for the second player: ", "Player 2");
        gameFlow.getPlayer2().setName(newName);

        // select the player name display
        let p2NameDisplay = document.querySelector('.p2NameDisplay');
        p2NameDisplay.textContent = newName;
    });
    
    

    // board container event listener listens for clicks
    boardContainer.addEventListener("click", (e) => {

        // if the game is active
        if (gameFlow.isGameActive()) {
            gameFlow.playOneTurn(e.target);
        }
    });

    return {
        swapBoardColor: () => {
            if (boardContainer.classList.contains('player1-board')) {
                boardContainer.classList.replace('player1-board', 'player2-board');
            } else {
                boardContainer.classList.replace('player2-board', 'player1-board');
            }
        },
        resetBoardColor: () => {
            boardContainer.classList.value = 'board player1-board';
        },
        buildBoardDisplay: () => {
            let cellNum = 1;

            for (let i = 0; i <= 2; i++) {

                const row = document.createElement('div');
                boardContainer.appendChild(row);
                row.classList.add('row');

                for (let j = 1; j <= 3; j++) {
                    const cell = document.createElement('button');
                    row.appendChild(cell);
                    cell.classList.add(cellNum, 'cell');
                    cellNum++;
                }
            }
        },
        deleteBoardDisplay: () => {
            boardContainer.innerHTML = '';
        },
        displayWinner: (winningPlayer) => {
            gameOverText.textContent = `${winningPlayer.getName()} won the game in 
            ${gameFlow.getTurn()} turns!`;
            gameFlow.setIsGameActive(false);
            updatePlayerWinsDisplay(winningPlayer);
        },
        displayTie: () => {
            gameOverText.textContent = `The game ended in a tie!`;
            gameFlow.setIsGameActive(false);
        },
        setGameOverText: (text) => {
            gameOverText.textContent = text;
        },
    }
})();


const createPlayer = function (mark, name, num) {
    const playerMark = mark;
    let playerName = name;
    const playerNum = num;
    let wins = 0;

    return {
        getMark: () => {
            return playerMark;
        },
        getName: () => {
            return playerName;
        },
        addWin: () => {
            wins++;
        },
        getWins: () => {
            return wins;
        },
        getNum: () => {
            return playerNum;
        },
        setName: (name) => {
            playerName = name;
        }
    }
};

const gameFlow = (function () {

    let isGameActive = false;

    // create our players
    const player1 = createPlayer("X", "Player 1", 1);
    const player2 = createPlayer("O", "Player 2", 2);

    // declare turns var and activePlayer var
    let turn = 1;
    let activePlayer = player1;

    return {
        getActivePlayer: () => {
            return activePlayer;
        },
        swapActivePlayer: () => {
            turn++;
            // swap active players
            if (activePlayer === player1) {
                activePlayer = player2;
            } else {
                activePlayer = player1;
            }
            displayController.setGameOverText(`Current Turn: ${activePlayer.getName()}`);

        },
        resetActivePlayer: () => {
            activePlayer = player1;
            turn = 1;
        },
        getTurn: () => {
            return turn;
        },
        playOneTurn: (target) => {
            // as long as the target element is one of our 9 cells...
            if (target.classList.contains("cell")) {

                // grab the first class of the element (a single number
                // representing the cell number)
                const targetCellClass = target.classList[0];

                // if the element has a third class
                // (meaning that the current cell is occupied)
                if (target.classList[2]) {
                    return; // return nothing, exit eventListener
                }

                let currentMark = gameFlow.getActivePlayer().getMark();

                // place the mark
                gameBoard.placeMark(targetCellClass, currentMark)
                // update the display
                target.classList.add(currentMark);

                // // print the board to the console
                gameBoard.printBoard();

                // if a winner is found
                if (gameBoard.checkWinner(currentMark)) {
                    activePlayer.addWin();
                    displayController.displayWinner(gameFlow.getActivePlayer());
                    return;
                }
                // if we've played 9 turns, trigger tie
                if (gameFlow.getTurn() >= 9) {
                    displayController.displayTie();
                    return;
                }
                // swap active player and continue to next turn
                gameFlow.swapActivePlayer();
                displayController.swapBoardColor();

            }
        },
        setupGame: () => {
            // setup a new, empty board array
            gameBoard.regenerateBoard();

            // change active player back to player1
            gameFlow.resetActivePlayer();

            // destroy any dom elements living inside of the board container
            displayController.deleteBoardDisplay();

            // create the dom elements that represent our board
            displayController.buildBoardDisplay();

            // reset board color:
            displayController.resetBoardColor();

            // mark the game as in-progress
            isGameActive = true;

            // Reset Game Over Text
            displayController.setGameOverText(`Current Turn: ${activePlayer.getName()}`);

        },
        isGameActive: () => {
            return isGameActive;
        },
        setIsGameActive: (bool) => {
            isGameActive = bool;
        },
        getPlayer1: () => {
            return player1;
        },
        getPlayer2: () => {
            return player2;
        },
    };
})();



