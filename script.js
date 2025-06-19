// shortcuts
const log = console.log;

const gameBoard = (function () {
    // createBoard() - reads the board array and displays board
    const rows = 3;
    const columns = 3;
    const board = [];

    // create the board
    for (let i = 0; i < rows; i++) {
        // the row elements will be arrays
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("_");
        }
    }

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
            // log(row);
            // log(col);
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
            if (board[0][1] === mark) { // 2
                if (board[1][1] === mark) { // 5
                    if (board[2][1] === mark) { // 8
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
        }
    }
})();

const createPlayer = function (mark, name) {
    const playerMark = mark;
    const playerName = name;
    return {
        getMark: () => {
            return playerMark;
        },
        getName: () => {
            return playerName;
        },
    }
};

const gameFlow = (function () {

    // private methods
    function displayWinner(name) {
        log(`${name} has won the match in ${turn} turns!`);
    }

    function displayTie() {
        log(`The match between ${player1.getName()} and ${player2.getName()} has ended in a tie!`);
    }

    // testing only
    let moves = [1, 3, 5, 2, 4, 7, 6, 8, 9]; // turn 9 win by player1
    // testing only
    let i = 0;

    // create our players
    const player1 = createPlayer("X", "zo");
    const player2 = createPlayer("O", "caz");

    // declare turns var and activePlayer var
    let turn = 1;
    let activePlayer = player1;

    while (true) {

        // place the mark
        gameBoard.placeMark(moves[i], activePlayer.getMark());


        // print board to console
        gameBoard.printBoard();

        // check for a winner
        if (gameBoard.checkWinner(activePlayer.getMark())) {
            displayWinner(activePlayer.getName());
            break;
        // check for a tie
        } else if (turn >= 9) {
            displayTie();
            break;
        }

        turn++;
        i++ // testing only

        // swap active players
        if (activePlayer === player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }
    

    return {
        getActivePlayer: () => {
            return activePlayer;
        },
    }

})();

const displayController = function () {

    // select the board from the dom
    const boardContainer = document.querySelector('.board');

    // board container event listener listens for clicks
    boardContainer.addEventListener("click", (e) => {

        const targetCellClass = e.target.classList[0];
        log(targetCellClass);
    });
}



