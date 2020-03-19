var Board = /** @class */ (function () {
    function Board(size) {
        this.size = size;
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
        else if (this.CheckBevel())
            this.DrawScore();
    };
    Board.prototype.CheckRow = function (row) {
        for (var i = 0; i < this.size; i++) {
            if (this.cells[row][i].sign != this.player)
                return false;
        }
        return true;
    };
    Board.prototype.CheckCol = function (col) {
        for (var i = 0; i < this.size; i++) {
            if (this.cells[i][col].sign != this.player)
                return false;
        }
        return true;
    };
    Board.prototype.CheckBevel = function () {
        for (var i = 0; i < this.size; i++) {
            if (this.cells[i][i].sign != this.player)
                return false;
        }
        return true;
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
var board = new Board(6);
