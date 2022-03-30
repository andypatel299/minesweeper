document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener('click', checkBomb)
})

populateMines();

function populateMines (){
   let column = document.querySelectorAll('.column')
   let totalColumns = column.length;
   let cellPerColumn = column[0].childElementCount;
   let mines = 10;

   while (mines !== 0){
       let randColumn = column[randNumber(totalColumns-1, 0)];
       let randCell = randColumn.children[randNumber(cellPerColumn-1, 0)];
       if (randCell.dataset.mine === undefined){
        randCell.dataset.mine = "yes";
        //randCell.style.background = "red";
        mines--;
       }
   }

   let allCells = document.querySelectorAll('[data-cell-number]');
   allCells.forEach(cell => bombNumbers(cell));
   
}

function randNumber(max, min){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkBomb(e){
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
    let currColumn = parseInt(e.target.parentNode.dataset.columnNumber);
    let currCell = parseInt(e.target.dataset.cellNumber);
    let allColumns = document.querySelectorAll(".column");
    

    for (let i=currColumn-1; i <= currColumn+1; i++){

        if (allColumns[i] !== undefined){
            for(let j=currCell-1; j<=currCell+1; j++){
                if (allColumns[i].children[j] !== undefined){
                    if(allColumns[i].children[j].dataset.bombs == 0){
                        clearZeros(allColumns[i].children[j]);
                    }
                    
                    
                }
            }
        }
    }
    e.target.innerHTML = e.target.dataset.bombs;
    e.target.dataset.active = "yes";       
}


function clearZeros(cell){
    let currColumn = parseInt(cell.parentNode.dataset.columnNumber);
    let currCell = parseInt(cell.dataset.cellNumber);
    let allColumns = document.querySelectorAll(".column");
    

    for (let i=currColumn-1; i <= currColumn+1; i++){

        if (allColumns[i] !== undefined){
            for(let j=currCell-1; j<=currCell+1; j++){
                if (allColumns[i].children[j] !== undefined){
                   
                    allColumns[i].children[j].dataset.active = "yes";
                    allColumns[i].children[j].innerHTML = allColumns[i].children[j].dataset.bombs;
                }
            }
        }
    }
           
}