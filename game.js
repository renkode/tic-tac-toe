var Gameboard = (function(){
    // tbh it's easier to read as a 1d array over 2d
    let board = [null,null,null,
                null,null,null,
                null,null,null];

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
        dom.cells.forEach(cell => cell.innerHTML = "");
    }

    const checkVictory = () => {
        // returns victor if there's a 3 in a row
        let symbol;
        switch (true) {
            case (!!board[0] && board[0] === board[1] && board[0] === board[2]):
                symbol = board[0]; 
                //console.log("1");
                break;
            case (!!board[3] && board[3] === board[4] && board[3] === board[5]):
                symbol = board[3];
                //console.log("2");
                break;
            case (!!board[6] && board[6] === board[7] && board[6] === board[8]):
                symbol = board[6];
                //console.log("3");
                break;
            case (!!board[0] && board[0] === board[3] && board[0] === board[6]):
                symbol = board[0];
                //console.log("4");
                break;
            case (!!board[1] && board[1] === board[4] && board[1] === board[7]):
                symbol = board[1];
                //console.log("5");
                break;
            case (!!board[2] && board[2] === board[5] && board[2] === board[8]):
                symbol = board[2];
                //console.log("6");
                break;
            case (!!board[4] && board[4] === board[0] && board[4] === board[8]):
                symbol = board[4];
                //console.log("7");
                break;
            case (!!board[4] && board[4] === board[6] && board[4] === board[2]):
                symbol = board[4];
                //console.log("8");
                break;
        }
        return symbol;
    }
    return {
        board, resetBoard, checkVictory,
    }
})();

var Player = function(name, symbol){
    let setSymbol = (newSymbol) => {
        // setting properties directly won't work for whatever reason
        symbol = newSymbol;
    }
    let drawSymbol = (cell) => {
        if (Gameboard.board[cell]) return;
        Gameboard.board[cell] = symbol;
        dom.cells[cell].innerHTML = symbol;
        Gameboard.checkVictory();
    }
    let chooseRandom = () => {
        // check if board is full
        if (!Gameboard.board.includes(null)) return;
        var cell = Math.floor(Math.random() * 9);
        // spot must be empty
        while (Gameboard.board[cell] !== null) {
            cell = Math.floor(Math.random() * 9);
        }
        Gameboard.board[cell] = symbol;
        dom.cells[cell].innerHTML = symbol;
        Gameboard.checkVictory();
    }
    return {
        name, setSymbol, drawSymbol, chooseRandom,
    }
}

var dom = (function(){
    let cells = document.querySelectorAll(".cell");
    
    cells.forEach(cell => cell.addEventListener("click",function(){
        index = Array.prototype.indexOf.call(cells, cell);
        player1.drawSymbol(index);
    }));

    let resetBtn = document.getElementById("reset-button");
    resetBtn.addEventListener("click", function(){
        Gameboard.resetBoard();
    });

    let selectXBtn = document.getElementById("select-x");
    selectXBtn.addEventListener("click", function(){
        player1.setSymbol("X");
        player2.setSymbol("O");
        Gameboard.resetBoard();
    });

    let selectOBtn = document.getElementById("select-o");
    selectOBtn.addEventListener("click", function(){
        player1.setSymbol("O");
        player2.setSymbol("X");
        Gameboard.resetBoard();
    });
    return { cells }
})();

var Controller = (function(){

})();

// default is X
let player1 = Player("Player 1", "X");
let player2 = Player("Player 2", "O");