
document.querySelector("#start-game").addEventListener("click", initial);


let MINES = 0;

function initial(){
    let container = document.querySelector(".game-container");
    if (container.firstChild){
        removeAllChildNodes(container);
    }

    MINES = parseInt(document.querySelector("#mines").value)
    let columns = parseInt(document.querySelector("#column").value)
    let rows = parseInt(document.querySelector("#row").value)

    if (MINES <= 0 || MINES >= columns*rows){
        return console.log("not valid number of mines");
    }

    if (columns <= 1 || columns > 25){
        return console.log("invalid column number");
    }

    if (rows <= 1 || rows > 25){
        return console.log("invalid row number");
    }


    createCells(columns, rows, MINES);
}

function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//createCells();
function createCells(columns, rows, mines){
    let numberOfCells = rows;
    let numberOfColumns = columns;
    
    for (let i = 0; i < numberOfColumns; i++){
        let container = document.querySelector(".game-container");
        let newColumn = document.createElement("div");
        newColumn.classList.add('column');
        newColumn.dataset.columnNumber = i;
        for (let j = 0; j < numberOfCells; j++){
            let newCell = document.createElement("div");
            newCell.classList.add('cell');
            newCell.dataset.cellNumber = j;
            newColumn.appendChild(newCell);
        }
        container.appendChild(newColumn);
    }

    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener('click', startGame)
        cell.addEventListener('contextmenu', placeFlag);
        
    })

}

function placeFlag(e){
    e.preventDefault();
    if (e.target.classList.contains("flagged")){
        e.target.classList.remove("flagged");
        return;
    }
    
    e.target.classList.add("flagged");
}

function startGame(event){
    if (!document.querySelector('[data-mine]')){
    populateMines(event.target);
    }   

    checkWin(event);
}

function populateMines (firstCell){
   let column =         document.querySelectorAll('.column')
   let totalColumns =   column.length;
   let cellPerColumn =  column[0].childElementCount;
   
   
   while (MINES !== 0){
       let randColumn = column[randNumber(totalColumns-1, 0)];
       let randCell = randColumn.children[randNumber(cellPerColumn-1, 0)];
       
       //Mine cannot go in first clicked cell OR a cell already containing a mine
       if (randCell.dataset.mine === undefined && randCell !== firstCell){
        randCell.dataset.mine = "yes";
        MINES--;
       }
   }

   let allCells = document.querySelectorAll('[data-cell-number]');
   allCells.forEach(cell => bombNumbers(cell));
   
}

function randNumber(max, min){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkWin(e){
    let totalCells = document.querySelectorAll('[data-cell-number]').length-1;
    let activeCells = document.querySelectorAll('[data-active="yes"]').length;
    let mineNum = document.querySelectorAll('[data-mine="yes"]').length;
    if (totalCells - activeCells === mineNum){
        console.log("win");
    }


    if (e.target.dataset.mine == "yes"){
        console.log("lose");
    }   
    else if (e.target.dataset.mine === undefined){
        bombSweep(e);
    }
}


function bombNumbers(e){
    let currColumn = parseInt(e.parentNode.dataset.columnNumber);
    let currCell = parseInt(e.dataset.cellNumber);
    let allColumns = document.querySelectorAll(".column");
    let bombCounter = 0;

    for (let i=currColumn-1; i <= currColumn+1; i++){

        if (allColumns[i] !== undefined){
            for(let j=currCell-1; j<=currCell+1; j++){
                if (allColumns[i].children[j] !== undefined){
                    if (allColumns[i].children[j].dataset.mine == "yes"){
                        bombCounter++;
                    }
                }
            }
        }
    }
    e.dataset.bombs = bombCounter;
}


function bombSweep(e){
    let clickedColumn = parseInt(e.target.parentNode.dataset.columnNumber);
    let clickedCell = parseInt(e.target.dataset.cellNumber);
    let allColumns = document.querySelectorAll(".column");
    

    for (let i=clickedColumn-1; i <= clickedColumn+1; i++){

        if (allColumns[i] !== undefined){
            for(let j=clickedCell-1; j<=clickedCell+1; j++){
                let currCell = allColumns[i].children[j];
                if (currCell !== undefined){
                    if(currCell.dataset.bombs == "0"){
                        currCell.dataset.zero = "active";
                    }
                }
            }
        }
    }
    
    if (e.target.dataset.bombs !== "0"){
    e.target.innerHTML = e.target.dataset.bombs;
    }

    e.target.dataset.active = "yes";
    
    if (document.querySelector('[data-zero = "active"]')){
    clearZeros();
    }
    
}


function clearZeros(){
    let zeroCell = document.querySelector('[data-zero = "active"]');

    if (!zeroCell){
        return;
    } 
    let currColumn = parseInt(zeroCell.parentNode.dataset.columnNumber);
    let currCell = parseInt(zeroCell.dataset.cellNumber);
    let allColumns = document.querySelectorAll(".column");
    
    
    if (zeroCell.dataset.zero !== undefined && zeroCell.dataset.zero == "active"){
        for (let i=currColumn-1; i <= currColumn+1; i++){

            if (allColumns[i] !== undefined){
                for(let j=currCell-1; j<=currCell+1; j++){
                    let thisCell = allColumns[i].children[j];
                    if (thisCell !== undefined){
                        if (thisCell.dataset.bombs == "0" && thisCell.dataset.zero !== "non-active"){
                            thisCell.dataset.zero = "active";
                        } else if (thisCell.dataset.bombs !== "0"){
                            thisCell.innerHTML = thisCell.dataset.bombs;
                        }
                        thisCell.dataset.active = "yes";
                    }
                }
            }
        }
        zeroCell.dataset.zero = "non-active";
    }

    clearZeros();

    

/*
    
 */          
}