var Gameboard = (function(){
    // tbh it's easier to read as a 1d array instead of 2d
    let board = [null,null,null,
                null,null,null,
                null,null,null];

    let cells = document.querySelectorAll(".cell");
    let timeOutTarget;

    // must wait for svg to load or else it returns null
    setTimeout(function() {
        let svgs = document.getElementById("svgs");
        for (let i = 0; i < cells.length; i++) {
            let svg = svgs.cloneNode();
            svg.id = `svg-${i}`;
            cells[i].appendChild(svg);
            _duplicateChildNodesToClone(svgs,svg);
        }}, 300 );

    const _duplicateChildNodesToClone = (parent, target) => {
        NodeList.prototype.forEach = Array.prototype.forEach;
        var children = parent.childNodes;
        children.forEach(function(item){
            var cln = item.cloneNode(true);
            target.appendChild(cln);
        });
    };

    const _drawAnimation = (symbol, index) => {
        let cellSVG = document.getElementById(`svg-${index}`);
        let circle = cellSVG.querySelector("circle");
        let lines = cellSVG.querySelectorAll("line");
        if (symbol === "O") {
            circle.setAttribute("class", "path circle");
            circle.setAttribute("visibility", "visible");
        } else if (symbol === "X") {
            lines[0].setAttribute("class", "path line");
            lines[1].setAttribute("class", "path line2");
            lines.forEach(line => {
                line.setAttribute("visibility", "visible");
            })
        }
    }

    let _disableInput = (bool) => {
        cells.forEach(cell => cell.disabled = bool);
    }

    const _resetBoard = () => {
        clearTimeout(timeOutTarget);
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }

        let paths = document.querySelectorAll(".path");
        paths.forEach(path => {
            path.setAttribute("class", "");
            path.setAttribute("visibility", "hidden");
        });

        if (player2.getSymbol() === "X") {
            setTimeout(function(){
                player2.chooseRandom(); 
            }, 200);
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
        _disableInput(true);
        setTimeout(function(){_disableInput(false);}, 1500);
        // end round after animation ends
        setTimeout(function(){
            if(_checkWinner()) {
                _endRound();
                return;
            }
        }, 800);
        // cancel player 2's selection
        if(_checkWinner()) {
            return;
        }
        timeOutTarget = setTimeout(function(){
            player2.chooseRandom(); 
            setTimeout(_endRound(),800);
        }, 1100);
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
        selectXBtn.disabled = true;
        selectOBtn.disabled = false;
    });

    let selectOBtn = document.getElementById("select-o");
    selectOBtn.addEventListener("click", function(){
        player1.setSymbol("O");
        player2.setSymbol("X");
        _resetBoard();
        selectXBtn.disabled = false;
        selectOBtn.disabled = true;
    });

    // can place the following outside of Gameboard
    var Player = function(name, symbol){
        const setName = (newName) => name = newName;
        const getName = () => name;
        const setSymbol = (newSymbol) => symbol = newSymbol;
        const getSymbol = () => symbol;
        const drawSymbol = (cell) => {
            if (board[cell]) return;
            board[cell] = symbol;
            _drawAnimation(symbol, index);
        }
        const chooseRandom = () => {
            // check if board is full
            if (!board.includes(null)) return;
            var cell = Math.floor(Math.random() * 9);
            // spot must be empty
            while (board[cell] !== null) {
                cell = Math.floor(Math.random() * 9);
            }
            board[cell] = symbol;
            _drawAnimation(symbol,cell);
        }
        return { setName, getName, setSymbol, getSymbol, drawSymbol, chooseRandom }
    }

    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");
    selectXBtn.disabled = true;
    return {board}
})();