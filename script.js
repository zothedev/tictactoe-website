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
            return board;
        },
        placeMark: (row, col, mark) => { board[row][col] = mark },
        isValidLocation: (row, col) => {
            // if the provided cell is empty,
            if (board[row][col] === "_") {
                return true;
            }
            return false;
        },
        // checkWinner: function (mark) {
        //     // simply checks for
        //     // X X X
        //     // _ _ _
        //     // _ _ _
        //     for (let cell of board[0]) {
        //         if (cell !== mark) {
        //             return false;
        //         }
        //     }
        //     return true;
        // }
    }
})();

const createPlayer = function (mark) {
    const playerMark = mark;

    return {
        getPlayerMark: () => { 
            return playerMark
        },
        promptPlayer: () => {
            let row = prompt("Enter a Row (0, 1, or 2)");
            let col = prompt("Enter a Column (0, 1, or 2)");
            return {
                row,
                col
            };
        }
    }
};

const gameFlow = (function () {
    // create our players
    const player1 = createPlayer("X");
    const player2 = createPlayer("O");

    // grab a reference to the board array
    const board = gameBoard.getBoard();

    // declare turns var and activePlayer var
    let turn = 1;
    let activePlayer = player1;

    // start game loop
    while (turn < 5) {

        // loop until a valid location is found. then place mark
        while (true) {
            // prompt player for location
            let { row, col } = activePlayer.promptPlayer();

            // verify the location is valid (empty)
            if (gameBoard.isValidLocation(row, col)) {

                // if location is valid
                // log(`${row}, ${col}, ${activePlayer.getPlayerMark()}`);
                gameBoard.placeMark(row, col, activePlayer.getPlayerMark());

                break;
            }
            log("error: this location is not valid");
        }
        turn++;
        if (player1 === activePlayer) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }

        // print the board
        gameBoard.printBoard();

        // if (gameBoard.checkWinner(activePlayer.mark)) {
        //     break;
        // }
    }

    log(`Congrats! ${activePlayer} wins!`)
})();


// game flow
// 1. create board
// 2. create players
// 3. assign player1 as active
// 4. player1 placeMark()
// 5. assign player2 as active
// 6. player2 placeMark()
// repeat
// 7. define method in gameFlow object that checks for a win after each placeMark()
// on win, display message and have option to play again