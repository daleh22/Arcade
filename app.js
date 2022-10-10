let roundWon = false
const cells = document.querySelectorAll(".cell");
console.log(cells)
const statusText = document.querySelector("#statusText")
console.log(statusText)
const restartBtn = document.querySelector("#restartBtn")
console.log(restartBtn)
// winCondition will be a 2 dimensional array of indicators. I need to know what cells to check
const winCondition = [
// first row 
    [0, 1, 2],
// second row
    [3, 4, 5],
// third row
    [6, 7, 8],
// column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
// diagonal
    [0, 4, 8],
    [2, 4, 6],
]; 

// array of placeholders/empty strings for each cell
let options = ["", "", "", "", "", "", "", "", ""]; 

// keep track of curent player
let currentPlayer = "X";

//boolean variable to keep track of if our game is running
    // !!! THIS TURNS THE GAME OFF AND ON !!!
let running = false;

// I am initializing the game by calling the function and taking care of the set-up.
initializeGame();

function initializeGame(){
    
    // adding an event listener "cells" and using the foreach method.
        // for each cell we will take our cell and add event listener
            // the event will be "click" and adding a callback of "cellClicked"
    cells.forEach(cell => cell.addEventListener("click", cellClicked));

      
    // adding an event listener to our restart button
        // when we "click" we are going to use our restart game function
    restartBtn.addEventListener("click", restartGame);
       
        // updating our status text
            // this will show the current player
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
};

// when we click on a variable what are we going to do?
function cellClicked(){
   if(roundWon != true){
    // create a local variable ie: let/const "cellIndex" 
    // this. refers to every cell that we click on
      // get attribute (cellIndex)
   const cellIndex = this.getAttribute("cellIndex");
    console.log(cellIndex)
   // we only want to update a cell if there's nothing there
        // if options at index of cellIndex does not equal an empty space or if the game is not running
            // then we will return; not do anything
    if(options[cellIndex] != "" || !running){
        // return;
    } 
    console.log(options)

    console.log('clicked')


    
    // otherwise we will invoke the updateCell function with an argument of "this" as well as "cellIndex"
    updateCell(this, cellIndex);

    // followed by the "checkWinner" function
    checkWinner();
}


    
}


// I am updating my placeholders here
function updateCell(cell, index){
    
    // take options at index of the index parameter and set this equal to the "currentPlayer"
    options[index] = currentPlayer;
    
    // change the text content of one of these cells equals current player
    cell.textContent = currentPlayer;
}

function changePlayer(){

    // if currentPlayer is equal to "X". Reassign our current player with "O". Otherwise 
    currentPlayer = currentPlayer == "X" ? "O" : "X"

    // then take statusText.textcontent = `${curentPlayer}'s turn.`
    statusText.textContent = `${currentPlayer}'s turn.`
}

function checkWinner(){
    roundWon = false;
    
    for(let i = 0; i < winCondition.length; i++){
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
       if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
        

    }
    if (roundWon == true){
        statusText.textContent = `${currentPlayer} wins!!!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    } 
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""]; 
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}



    
   








