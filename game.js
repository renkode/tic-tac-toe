var dom = (function(){
    let cells = document.body.querySelectorAll(".cell");
    cells.forEach(cell => cell.addEventListener("click",function(e){
        console.log(Array.prototype.indexOf.call(cells, cell));
    }));
    return {
        cells,
    }
})();

var Gameboard = (function(){
    let board = [[null,null,null],
                [null,null,null],
                [null,null,null]];

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = [null,null,null];
        }
    }
    const displayBoard = () => {
        console.table(Gameboard.board);
    }

    const checkVictory = () => {
        // returns victor if there's a 3 in a row
        let symbol;
        switch (true) {
            case (!!board[0][0] && board[0].every((val, i, arr) => val === arr[0])):
                symbol = board[0][0]; 
                //console.log("1");
                break;
            case (!!board[1][0] && board[1].every((val, i, arr) => val === arr[0])):
                symbol = board[1][0];
                //console.log("2");
                break;
            case (!!board[2][0] && board[2].every((val, i, arr) => val === arr[0])):
                symbol = board[2][0];
                //console.log("3");
                break;
            case (!!board[0][0] && board[0][0] === board[1][0] && board[0][0] === board[2][0]):
                symbol = board[0][0];
                //console.log("4");
                break;
            case (!!board[0][1] && board[0][1] === board[1][1] && board[0][1] === board[2][1]):
                symbol = board[0][1];
                //console.log("5");
                break;
            case (!!board[0][2] && board[0][2] === board[1][2] && board[0][2] === board[2][2]):
                symbol = board[0][2];
                //console.log("6");
                break;
            case (!!board[1][1] && board[0][0] === board[1][1] && board[0][0] === board[2][2]):
                symbol = board[1][1];
                //console.log("7");
                break;
            case (!!board[1][1] && board[2][0] === board[1][1] && board[2][0] === board[0][2]):
                symbol = board[1][1];
                //console.log("8");
                break;
        }
        return symbol;
    }
    return {
        board, resetBoard, displayBoard, checkVictory,
    }
})();

var Player = function(name, symbol){
    let drawSymbol = (row, column) => {
        Gameboard.board[row][column] = symbol;
    }
    let chooseRandom = () => {
        // check if board is full
        if (!Gameboard.board.some(row => row.includes(null))) return;
        var row = Math.floor(Math.random() * 3);
        var column = Math.floor(Math.random() * 3);
        // spot must be empty
        while (Gameboard.board[row][column] !== null) {
            row = Math.floor(Math.random() * 3);
            column = Math.floor(Math.random() * 3);
        }
        Gameboard.board[row][column] = symbol;
    }
    return {
        name, symbol, drawSymbol, chooseRandom,
    }
}

let playerX = Player("Player 1", "X");
let playerO = Player("Player 2", "O");
//playerX.drawSymbol(0,2);
//playerX.drawSymbol(1,1);
//playerX.drawSymbol(1,0);
//Gameboard.displayBoard();
//console.log(Gameboard.checkVictory());