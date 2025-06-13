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
            return board
        },
        placeMark: (row, col, mark) => { board[row][col] = mark },
        isValidLocation: (row, col) => {
            // if the provided cell is empty,
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

const createPlayer = function (mark, num) {
    const playerMark = mark;
    const playerName = num;
    return {
        getPlayerMark: () => {
            return playerMark
        },
        getPlayerName: () => {
            return playerName;
        },
        promptPlayer: () => {
            let cellID = prompt(`Choose a Box: \n 1  2  3\n 4  5  6\n 7  8  9`);
            // convert cellID into coordinates
            switch (cellID) {
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
    }
};

const displayController = (function () {

    return {
        renderBoard: () => {

            // // select a reference to the html element
            // // housing the board
            // const boardContainer = document.querySelector(".board");
            // // select a reference to our board array
            // const board = gameBoard.getBoard();

            // boardContainer.textContent = "";
            // let rowContainer = "";


            // loop through the board array and display the content
            // of each cell
            // for (let row of board) {
            //     // create row container
            //     rowContainer = document.createElement("div");
            //     rowContainer.classList.add("row");
            //     // loop thru each row
            //     for (let cell of row) {
            //         let cellContainer = document.createElement("button");
            //         cellContainer.textContent = cell;
            //         rowContainer.appendChild(cellContainer);
            //     }
            //     boardContainer.appendChild(rowContainer);

            // }

        }
    }
})();

const gameFlow = (function () {
    // create our players
    const player1 = createPlayer("X", "zo");
    const player2 = createPlayer("O", "caz");

    // declare turns var and activePlayer var
    let turn = 1;
    let activePlayer = player1;

    // start game loop
    while (true) {

        // testing only
       let x = [0,1,2,0,0,2,1,2,1];
       let y = [0,1,0,2,1,2,2,1,0];


        // place activePlayer's mark on given cell
        gameBoard.placeMark(x[turn-1], y[turn-1], activePlayer.getPlayerMark());

        // print the board
        gameBoard.printBoard();

        // render the board on screen
        displayController.renderBoard();

        // check for winning pattern
        if (gameBoard.checkWinner(activePlayer.getPlayerMark())) {
            break;
        }
        log(`current turn: ${turn}`)

        // check for tie game
        if (turn >= 9) {
            turn++;
            break;
        }

        // advance turn
        turn++;

        // swap active player
        if (player1 === activePlayer) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }

    if (turn >= 10) {
        log("Tie Game!")
    } else {
        log(`Congrats! ${activePlayer.getPlayerName()} wins!`);
    }

})();

