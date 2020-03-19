class Board 
{
	table: HTMLTableElement; 
	scoreText: HTMLElement;
	public cells:Cell[][];
	size:number;
	player:boolean //Player1-X-false; Player2-O-true
    constructor(size: number) 
    {
       this.size =size;
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
    			if(this.CheckBevel())this.DrawScore();    	   	     
    }

    CheckRow(row:number) : boolean
    {
		for(var i: number = 0; i< this.size; i++) 
        {
        	if(this.cells[row][i].sign != this.player) return false;            
        }
        return true;
    }

    CheckCol(col:number) : boolean
    {
        for(var i: number = 0; i< this.size; i++) 
        {
        	if(this.cells[i][col].sign != this.player) return false;             
        }
        return true;        
    }

    CheckBevel() : boolean
    {    	
        for(var i: number = 0; i< this.size; i++) 
        {
        	if(this.cells[i][i].sign != this.player) return false;           
        } 
        return true;        
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

const board:Board = new Board(6);