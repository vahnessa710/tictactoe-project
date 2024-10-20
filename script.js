let board = document.getElementById("board");
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]
let playerTurn1 = true;
const resetButton = document.getElementById("reset");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
let state = []; // move history
let currentStateIndex = 0;
const tictactoeBox = document.getElementsByClassName("tictactoeBox");
let title = document.getElementById("title"); // tictactoe text
let gameEnded = false;

function createBoard(){
    for(let i = 0; i < 9; i++){
        let tictactoeGrid = document.createElement("div");
        tictactoeGrid.className ="tictactoeBox";
        let gridId = `box${i}`;
        tictactoeGrid.setAttribute("id", gridId);
        board.appendChild(tictactoeGrid);
        tictactoeGrid.addEventListener("click", () => {
            if(!gameEnded){
                addMove(gridId, i); 
            }
        });
    } 
};

function addMove(element, boxNumber){ 
    let specificGrid = document.getElementById(element);
    if(!specificGrid.textContent){ // if grid is empty
        if(playerTurn1){
            specificGrid.textContent = "X";
            playerTurn1 = false;
        } else {
            specificGrid.textContent = "O";
            playerTurn1 = true;
        }
    }
    updateBoard(specificGrid, boxNumber); // to update gameBoard with the new move
    checkWinner();
}

// render
function updateBoard(element, boxNumber){
    let row = Math.floor(boxNumber/3);
    let column = boxNumber%3;
    gameBoard[row][column] = element.innerText; // correct spot on the gameBoard array = X or O; 
    updateState(gameBoard); // to save the current state of the board
}

// history; copy of the game

function updateState(boardCopy) {
    const newBoard = []; // a new array that will hold the copy of the current gameBoard;
    for(let i = 0; i < boardCopy.length; i++){ // loop through the outer array [3]
        const row = [];
        for(let j = 0; j < boardCopy[i].length; j++){ // loop through the indices of the gameBoard
            row.push(boardCopy[i][j]);
        } // closes the inner for loop
        newBoard.push(row);
        currentStateIndex = state.length;
    } //closes the outer for loop
    state.push(newBoard); // adds this copy to history[];
};

function reflectBoard(index){
    let tempBoard = state[index];
    let moveString = [];
    for(let i = 0; i < tempBoard.length; i++){
        for(let j = 0; j < tempBoard[i].length; j++){
            moveString.push(tempBoard[i][j]);
        }
    }
    for(let grid = 0; grid < moveString.length; grid++){
        document.getElementById(`box${grid}`).textContent = moveString[grid];
    }

}

previousButton.addEventListener("click", () => {
    if(currentStateIndex > 0){ 
        currentStateIndex--;
        reflectBoard(currentStateIndex);
    }
});

nextButton.addEventListener("click", () => {
    if(currentStateIndex < state.length){
        currentStateIndex++;
        reflectBoard(currentStateIndex);
    }
})

resetButton.onclick = () => {
    for(let box of tictactoeBox){
        box.textContent = "";  // clear the boxes;
     };
    gameBoard = [ ['', '', ''], ['', '', ''], ['', '', ''] ]; // reset the array;
    playerTurn1 = true; // player x active; 
    gameEnded = false; // start the game again;
    title.textContent = "TicTacToe";
};

// checking the winner && alert

function checkWinner() {
    const boxes = document.querySelectorAll(".tictactoeBox");
    for(let i = 0; i < gameBoard.length; i++){
        // row checker
        if(gameBoard[i][0] !== "" && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]){
            title.textContent = `${gameBoard[i][0]} wins!`
            gameEnded = true;
            return;
        };

        //column checker
        if(gameBoard[0][i] !== "" && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]){
            title.textContent = `${gameBoard[0][i]} wins!`
            gameEnded = true;
            return; 
            };

        // diagonal checker
        if(gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]){
            console.log("diagonal 1")
            title.textContent = `${gameBoard[0][0]} wins!`
            gameEnded = true;
            return; 
            };

        if(gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]){
                console.log("diagonal 2")
                title.textContent = `${gameBoard[0][2]} wins!`
                gameEnded = true;
                return;
                };

        // draw

        let allBoxesMarked = true;
        for(const box of gameBoard.flat()){ // will loop through all the boxes inside the gameBoard
            if(!box){ // if box is falsy = empty
                allBoxesMarked = false; // all boxes are not yet marked; therefore false
                break; // stops the for loop;
            }
        }

        if(allBoxesMarked){ // if it is true or NOT empty
            title.textContent = `It's a tie!` // then its a tie
            gameEnded = true;
        }
            
    }// closes for Inner Loop
       
} // closes function checkWinner()


createBoard();