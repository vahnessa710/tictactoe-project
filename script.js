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
const xImage = "https://banner2.cleanpng.com/20240210/tig/transparent-pikachu-happy-and-surprised-pikachu-with-cute-1710881345265.webp";
const oImage = "https://w7.pngwing.com/pngs/952/176/png-transparent-pokemon-pokeball-illustration-drawing-pokemon-pokeball-angle-image-file-formats-pokemon.png";

function createBoard(){
    board.innerHTML = "";
    imgContainer.style.display = "none";
    wins.style.display = "none";
    for(let i = 0; i < 9; i++){
        let tictactoeGrid = document.createElement("div");
        tictactoeGrid.className ="tictactoeBox";
        let gridId = `box${i}`;
        tictactoeGrid.setAttribute("id", gridId);
        title.innerText = "Pikachu's TicTacToe";
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
    if(!specificGrid.innerHTML){ // if grid is empty
        if(playerTurn1){
            specificGrid.innerHTML = `<img src="${xImage}" alt = "X" class ="pokemon-icon">`
            playerTurn1 = false;
        } else {
            specificGrid.innerHTML = `<img src="${oImage}" alt = "O" class ="pokemon-icon">`
            playerTurn1 = true;
        }
    }
    updateBoard(specificGrid, boxNumber); // to update gameBoard with the new move
    checkWinner();
}

function updateBoard(element, boxNumber){ // updates the gameboard array
    let row = Math.floor(boxNumber/3);
    let column = boxNumber%3;
    gameBoard[row][column] = element.innerHTML; // coordinate = innertext = X or O;
    updateState(gameBoard); // to save the current state of the board;
}

// history; copy of the game
// adding value to state[] and currentStateIndex
function updateState(boardCopy) {
    const newBoard = []; // this will hold the copy of the gameBoard;
    for(let i = 0; i < boardCopy.length; i++){ // row
        const row = [];
        for(let j = 0; j < boardCopy[i].length; j++){ // column
            row.push(boardCopy[i][j]);
        } // closes the inner for loop
        newBoard.push(row);
        currentStateIndex = state.length;
    } //closes the outer for loop
    state.push(newBoard); // adds the copy to state[];
};

// render 
function reflectBoard(index){
    let tempBoard = state[index]; // this will hold the state[currentStateIndex];
    let moveString = []; // array that will store the individual elements of tempBoard;
    
    console.log(`state[index]= ${state[index]}`);
    console.log(`index = ${index}`)
    console.log(`state index = ${state[index]}`);
    console.log(`tempBoard = ${tempBoard}`)
    
    for(let i = 0; i < tempBoard.length; i++){ // row iteration
        for(let j = 0; j < tempBoard[i].length; j++){ // column iteration
            moveString.push(tempBoard[i][j]); // push all elements of tempBoard to moveString array;
            console.log(`moveString = ${moveString}`)
        }
    }
    for(let grid = 0; grid < moveString.length; grid++){
        document.getElementById(`box${grid}`).innerHTML = moveString[grid];
    } // display on grid
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
        box.innerHTML = "";  // clear the boxes;
     };
    gameBoard = [ ['', '', ''], ['', '', ''], ['', '', ''] ];
    playerTurn1 = true;  
    gameEnded = false; // to add move
    previousButton.style.display = "none";
    nextButton.style.display = "none";
    document.getElementById("img-container").style.display = "none";
    document.getElementById("wins").style.display = "none";
    title.style.display = "block";
    currentStateIndex = 0; // Reset history index
    state = []; // Clear move history
    createBoard();
};

// checking the winner && alert

function checkWinner() {
    const boxes = document.querySelectorAll(".tictactoeBox");
    for(let i = 0; i < gameBoard.length; i++){
        // row checker
        if(gameBoard[i][0] !== "" && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]){
            displayImg(gameBoard[i][0]);
            gameEnded = true;
            previousButton.style.display = "block";
            nextButton.style.display = "block";
            return;
        };

        //column checker
        if(gameBoard[0][i] !== "" && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]){
            displayImg(gameBoard[0][i]);
            gameEnded = true;
            previousButton.style.display = "block";
            nextButton.style.display = "block";
            return; 
            };

        // diagonal checker
        if(gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]){
            displayImg(gameBoard[0][0]);
            gameEnded = true;
            previousButton.style.display = "block";
            nextButton.style.display = "block";
            return; 
            };

        if(gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]){
                displayImg(gameBoard[0][2]);
                gameEnded = true;
                previousButton.style.display = "block";
                nextButton.style.display = "block";
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
            previousButton.style.display = "block";
            nextButton.style.display = "block";
            gameEnded = true;
        }
    }// closes for Inner Loop

} // closes function checkWinner()

let imgContainer = document.getElementById("img-container");
let wins = document.getElementById("wins");
function displayImg(image) {
    imgContainer.style.display = "inline-block";
    imgContainer.innerHTML = image;
    title.style.display = "none";
    wins.style.display = "inline-block";
    wins.innerText = "wins!";
    return;
}

createBoard();