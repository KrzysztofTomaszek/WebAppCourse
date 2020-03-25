class Board 
{
	table: HTMLTableElement; 
	scoreText: HTMLElement;
	public cells:Cell[][];
	size:number;
	strikeSize:number;
	player:boolean //Player1-X-false; Player2-O-true
    constructor(size : number, strikeSize : number) 
    {
       this.size = size;
       this.strikeSize = strikeSize;
       this.GenerateVisualBoard();    	
       this.GenerateCellTabel();
       this.player=false;
    }

    GenerateCellTabel()  : void
    {
        this.cells = [];
        for(var i: number = 0; i < this.size; i++) 
        {
            this.cells[i] = [];
            for(var j: number = 0; j< this.size; j++) 
            {
                this.cells[i][j] = new Cell(i, j);
            }
        }
    }

    GenerateVisualBoard() : void
    {
    	this.table = <HTMLTableElement> document.getElementById("Board");
    	this.scoreText = <HTMLElement> document.getElementById("Score");
		for(var i: number = 0; i < this.size; i++) 
        {
            let row = this.table.insertRow(0);
            for(var j: number = 0; j< this.size; j++) 
            {
                let cell = row.insertCell(0);
        		cell.setAttribute('onclick', 'board.Click('+i+','+j+');');
        		cell.id=i+"|"+j;
            }         
        }
    }

    Click(row:number, col:number) : void
    {
    	let cell: Cell =this.cells[row][col];
    	if(!cell.lock)
    	{
    		if(!this.player){
    			cell.DrawSign("X"); 
    			cell.sign=false;
    			}   			
    		else {
    			cell.DrawSign("O"); 
    			cell.sign=true;
    		}   
    		this.CheckWin(row,col);
    		this.player=!this.player;  
    		cell.lock=true;  	    			
    	}
    }

    CheckWin(row:number, col:number) : void
    {   
    	if(this.CheckRow(row))this.DrawScore();
    	else    	
    		if(this.CheckCol(col))this.DrawScore();
    		else
    			if(this.CheckBevel(row, col))this.DrawScore();    	   	     
    }

    CheckRow(row:number) : boolean
    {
    	let strike:number = 0;
		for(var i: number = 0; i< this.size; i++) 
        {
        	if(this.cells[row][i].sign == this.player) strike++;     
        	else strike = 0;          
        }
        if(strike >= this.strikeSize || strike >= this.size) return true;
        return false;
    }

    CheckCol(col:number) : boolean
    {
    	let strike:number = 0;
        for(var i: number = 0; i< this.size; i++) 
        {
        	if(this.cells[i][col].sign == this.player) strike++;           
        	else strike = 0;    
        }
        if(strike >= this.strikeSize || strike >= this.size) return true;
        return false;       
    }

	CheckBevel(row:number, col:number) : boolean
	{	 	
	 	if(this.CheckUpperLeft(row, col, this.strikeSize)) return true;
	 	if(this.CheckUpperRight(row, col, this.strikeSize)) return true;
	 	if(this.CheckBottomLeft(row, col, this.strikeSize)) return true;
	 	if(this.CheckBottomRight(row, col, this.strikeSize)) return true;
	 	return false;  
	} 

	CheckUpperLeft(row:number, col:number, strike: number) : boolean
	{
		if(strike == 1) return true;
		if(row+1<this.size && col+1<this.size)
		{
			if (this.cells[row][col].sign == this.cells[row+1][col+1].sign) 
		 	{
	 			if(this.CheckUpperLeft(row+1, col+1, strike-1)) return true;		 		
		 	}
		}
		return false;
	}

	CheckUpperRight(row:number, col:number, strike: number) : boolean
	{
		if(strike == 1) return true;
		if(row+1<this.size && col-1 >= 0)
		{
			if (this.cells[row][col].sign == this.cells[row+1][col-1].sign) 
	 		{
	 			if(this.CheckUpperRight(row+1, col-1, strike-1)) return true;
	 		}
		}
		return false;
	}

	CheckBottomLeft(row:number, col:number, strike: number) : boolean
	{
		if(strike == 1) return true;
		if(row-1 >= 0 && col+1<this.size)
		{
			if (this.cells[row][col].sign == this.cells[row-1][col+1].sign) 
		 	{
		 		if(this.CheckBottomLeft(row-1, col+1, strike-1)) return true;
		 	}
		}
		return false;
	}

	CheckBottomRight(row:number, col:number, strike: number) : boolean
	{
		if(strike == 1) return true;
		if(row-1 >= 0 && col-1 >= 0)
		{
			if (this.cells[row][col].sign == this.cells[row-1][col-1].sign) 
		 	{
		 		if(this.CheckBottomRight(row-1, col-1, strike-1)) return true;
		 	}
		}
		return false;
	}

    DrawScore() : void
    {
    	if(!this.player) this.scoreText.innerHTML="Wygrał krzyżyk";
    	else this.scoreText.innerHTML="Wygrało kółko";
    	this.LockAllBoard();
    }

    LockAllBoard() : void
    { 
        for(var i: number = 0; i < this.size; i++) 
        { 
            for(var j: number = 0; j< this.size; j++) 
            {
                this.cells[i][j].lock=true;
            }
        }
    }
}

class Cell {
	lock: boolean;
	sign: boolean;
	cellV: HTMLInputElement; 

    constructor(row:number, col:number) 
    {
        this.lock=false;
        this.sign=null;
        this.cellV=<HTMLInputElement> document.getElementById(row+"|"+col);
    }

    DrawSign(sign:string) : void
    {
    	this.cellV.innerHTML = sign;
    }    
}

let board:Board;

function StartGame() :void
{
	document.getElementById("Score").innerHTML="";
	var table = document.getElementById("Board");
	while(table.hasChildNodes()) table.removeChild(table.firstChild);

	let size = Number((<HTMLInputElement> document.getElementById("gameSize")).value);
	let strike = Number((<HTMLInputElement> document.getElementById("winSize")).value);

	board = new Board(size,strike);
}
