const cell = document.querySelectorAll('.cell')
const resultDisply = document.getElementById('resultDisply')
const resetBtn = document.getElementById('resetBtn')
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

function beginGame(){
    cell.forEach(cell => cell.addEventListener('click', cellClicked))
    resultDisply.textContent = `${currentPlayer}'s turn`
    resetBtn.addEventListener('click', restartGame)
    running = true;
}
beginGame()

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex')

    //only want to update the cell if their is nothing in cell
    if(options[cellIndex] !== '' || !running){
        return
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    resultDisply.textContent = `${currentPlayer}' turn`
}

function checkWinner(){

    //if somebody wins we flip this to true
    let rountWon = false;

    for(let i=0; i<winConditions.length; i++){
        //let store each of array in temparery variable
        const condition = winConditions[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if(cellA == '' || cellB == '' || cellC == ''){
            continue
        }
        if(cellA == cellB && cellB == cellC){
            rountWon = true;
            break;
        }
    }
    if(rountWon){
        resultDisply.textContent = `${currentPlayer} Win!`
        alert(`${currentPlayer} Wins! 🎉`);
        running = false;
    }
    else if(!options.includes('')){
        resultDisply.textContent = `Draw!`;
        alert(`It's a Draw! 🤝`);
        running = false;
    }
    else{
        changePlayer()
    }
}

function restartGame(){
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    resultDisply.textContent = `${currentPlayer}'s turn!`;
    cell.forEach(cell => cell.textContent = '')
    running = true;
}