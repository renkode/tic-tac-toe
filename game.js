var Gameboard = (function(){
    // tbh it's easier to read as a 1d array over 2d
    let board = [null,null,null,
                null,null,null,
                null,null,null];

    let cells = document.querySelectorAll(".cell");

    let _disableInput = (bool) => {
        cells.forEach(cell => cell.disabled = bool);
    }

    const _resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
        cells.forEach(cell => cell.innerHTML = "");
        if (player2.getSymbol() === "X") {
            _disableInput(true);
            setTimeout(function(){
                player2.chooseRandom(); 
                _disableInput(false);
            }, 500);
        }
    }

    const _checkWinner = () => {
        // returns victor if there's a 3 in a row
        let symbol;
        switch (true) {
            case (!!board[0] && board[0] === board[1] && board[0] === board[2]):
                symbol = board[0]; 
                break;
            case (!!board[3] && board[3] === board[4] && board[3] === board[5]):
                symbol = board[3];
                break;
            case (!!board[6] && board[6] === board[7] && board[6] === board[8]):
                symbol = board[6];
                break;
            case (!!board[0] && board[0] === board[3] && board[0] === board[6]):
                symbol = board[0];
                break;
            case (!!board[1] && board[1] === board[4] && board[1] === board[7]):
                symbol = board[1];
                break;
            case (!!board[2] && board[2] === board[5] && board[2] === board[8]):
                symbol = board[2];
                break;
            case (!!board[4] && board[4] === board[0] && board[4] === board[8]):
                symbol = board[4];
                break;
            case (!!board[4] && board[4] === board[6] && board[4] === board[2]):
                symbol = board[4];
                break;
        }
        return symbol;
    }
    
    const _endRound = () => {
        if (!board.includes(null) && !_checkWinner()) {
            alert(`It's a draw!`);
            _resetBoard();
        } else if (!_checkWinner()){
            return;
        } else if (_checkWinner()) {
            alert(`The winner is ${_checkWinner()}!`);
        }
        _resetBoard();
    }
    
    cells.forEach(cell => cell.addEventListener("click",function(){
        index = Array.prototype.indexOf.call(cells, cell);
        if (board[index]) return; // don't pick same cell!
        player1.drawSymbol(index);
        if(_checkWinner()) {
            _endRound();
            return;
        }
        _disableInput(true);
        setTimeout(function(){
            player2.chooseRandom(); 
            _disableInput(false);
            _endRound();
        }, 500);
        
    }));

    let resetBtn = document.getElementById("reset-button");
    resetBtn.addEventListener("click", function(){
        _resetBoard();
    });

    let selectXBtn = document.getElementById("select-x");
    selectXBtn.addEventListener("click", function(){
        player1.setSymbol("X");
        player2.setSymbol("O");
        _resetBoard();
    });

    let selectOBtn = document.getElementById("select-o");
    selectOBtn.addEventListener("click", function(){
        player1.setSymbol("O");
        player2.setSymbol("X");
        _resetBoard();
    });
    
    return { board, cells }
})();

var Player = function(name, symbol){
    const setName = (newName) => name = newName;
    const getName = () => name;
    const setSymbol = (newSymbol) => symbol = newSymbol;
    const getSymbol = () => symbol;
    const drawSymbol = (cell) => {
        if (Gameboard.board[cell]) return;
        Gameboard.board[cell] = symbol;
        Gameboard.cells[cell].innerHTML = symbol;
    }
    const chooseRandom = () => {
        // check if board is full
        if (!Gameboard.board.includes(null)) return;
        var cell = Math.floor(Math.random() * 9);
        // spot must be empty
        while (Gameboard.board[cell] !== null) {
            cell = Math.floor(Math.random() * 9);
        }
        Gameboard.board[cell] = symbol;
        Gameboard.cells[cell].innerHTML = symbol;
    }
    return { setName, getName, setSymbol, getSymbol, drawSymbol, chooseRandom }
}

// default is X
let player1 = Player("Player 1", "X");
let player2 = Player("Player 2", "O");