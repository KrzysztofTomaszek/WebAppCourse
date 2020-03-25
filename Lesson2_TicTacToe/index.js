var Board = /** @class */ (function () {
    function Board(size, strikeSize) {
        this.size = size;
        this.strikeSize = strikeSize;
        this.GenerateVisualBoard();
        this.GenerateCellTabel();
        this.player = false;
    }
    Board.prototype.GenerateCellTabel = function () {
        this.cells = [];
        for (var i = 0; i < this.size; i++) {
            this.cells[i] = [];
            for (var j = 0; j < this.size; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
    };
    Board.prototype.GenerateVisualBoard = function () {
        this.table = document.getElementById("Board");
        this.scoreText = document.getElementById("Score");
        for (var i = 0; i < this.size; i++) {
            var row = this.table.insertRow(0);
            for (var j = 0; j < this.size; j++) {
                var cell = row.insertCell(0);
                cell.setAttribute('onclick', 'board.Click(' + i + ',' + j + ');');
                cell.id = i + "|" + j;
            }
        }
    };
    Board.prototype.Click = function (row, col) {
        var cell = this.cells[row][col];
        if (!cell.lock) {
            if (!this.player) {
                cell.DrawSign("X");
                cell.sign = false;
            }
            else {
                cell.DrawSign("O");
                cell.sign = true;
            }
            this.CheckWin(row, col);
            this.player = !this.player;
            cell.lock = true;
        }
    };
    Board.prototype.CheckWin = function (row, col) {
        if (this.CheckRow(row))
            this.DrawScore();
        else if (this.CheckCol(col))
            this.DrawScore();
        else if (this.CheckBevel(row, col))
            this.DrawScore();
    };
    Board.prototype.CheckRow = function (row) {
        var strike = 0;
        for (var i = 0; i < this.size; i++) {
            if (this.cells[row][i].sign == this.player)
                strike++;
            else
                strike = 0;
        }
        if (strike >= this.strikeSize || strike >= this.size)
            return true;
        return false;
    };
    Board.prototype.CheckCol = function (col) {
        var strike = 0;
        for (var i = 0; i < this.size; i++) {
            if (this.cells[i][col].sign == this.player)
                strike++;
            else
                strike = 0;
        }
        if (strike >= this.strikeSize || strike >= this.size)
            return true;
        return false;
    };
    Board.prototype.CheckBevel = function (row, col) {
        if (this.CheckUpperLeft(row, col, this.strikeSize))
            return true;
        if (this.CheckUpperRight(row, col, this.strikeSize))
            return true;
        if (this.CheckBottomLeft(row, col, this.strikeSize))
            return true;
        if (this.CheckBottomRight(row, col, this.strikeSize))
            return true;
        return false;
    };
    Board.prototype.CheckUpperLeft = function (row, col, strike) {
        if (strike == 1)
            return true;
        if (row + 1 < this.size && col + 1 < this.size) {
            if (this.cells[row][col].sign == this.cells[row + 1][col + 1].sign) {
                if (this.CheckUpperLeft(row + 1, col + 1, strike - 1))
                    return true;
            }
        }
        return false;
    };
    Board.prototype.CheckUpperRight = function (row, col, strike) {
        if (strike == 1)
            return true;
        if (row + 1 < this.size && col - 1 >= 0) {
            if (this.cells[row][col].sign == this.cells[row + 1][col - 1].sign) {
                if (this.CheckUpperRight(row + 1, col - 1, strike - 1))
                    return true;
            }
        }
        return false;
    };
    Board.prototype.CheckBottomLeft = function (row, col, strike) {
        if (strike == 1)
            return true;
        if (row - 1 >= 0 && col + 1 < this.size) {
            if (this.cells[row][col].sign == this.cells[row - 1][col + 1].sign) {
                if (this.CheckBottomLeft(row - 1, col + 1, strike - 1))
                    return true;
            }
        }
        return false;
    };
    Board.prototype.CheckBottomRight = function (row, col, strike) {
        if (strike == 1)
            return true;
        if (row - 1 >= 0 && col - 1 >= 0) {
            if (this.cells[row][col].sign == this.cells[row - 1][col - 1].sign) {
                if (this.CheckBottomRight(row - 1, col - 1, strike - 1))
                    return true;
            }
        }
        return false;
    };
    Board.prototype.DrawScore = function () {
        if (!this.player)
            this.scoreText.innerHTML = "Wygrał krzyżyk";
        else
            this.scoreText.innerHTML = "Wygrało kółko";
        this.LockAllBoard();
    };
    Board.prototype.LockAllBoard = function () {
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                this.cells[i][j].lock = true;
            }
        }
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell(row, col) {
        this.lock = false;
        this.sign = null;
        this.cellV = document.getElementById(row + "|" + col);
    }
    Cell.prototype.DrawSign = function (sign) {
        this.cellV.innerHTML = sign;
    };
    return Cell;
}());
var board;
function StartGame() {
    document.getElementById("Score").innerHTML = "";
    var table = document.getElementById("Board");
    while (table.hasChildNodes())
        table.removeChild(table.firstChild);
    var size = Number(document.getElementById("gameSize").value);
    var strike = Number(document.getElementById("winSize").value);
    board = new Board(size, strike);
}
