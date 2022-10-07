// module
let gameBoard = (() => {
  let board = [];
  let state = "X";
  let nameX = "X";
  let nameO = "O";
  let gameDone = false;
  const boardDOM = document.querySelectorAll(".cell");
  const buttonReset = document.querySelectorAll(".reset");
  const buttonSetX = document.querySelector("#addUser1 .submitName");
  const buttonSetO = document.querySelector("#addUser2 .submitName");
  const inputX = document.getElementById("user1");
  const inputO = document.getElementById("user2");
  const paragraph = document.querySelector("p");
  const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  // Loop der skaber cell-objects i et array board
  for(let i = 0; i < 9; i++) {
    const cell = {
      index: i,
      DOM: boardDOM[i],
      cellMark: "empty"
    }
    board.push(cell)
  }

  const cellClick = (e) => {
    const cell = e.target
    
    if(gameDone === false){
      // Fill the cell
      if (cell.textContent === '') {
        // Marks the spot
        cell.textContent = state;
        board[cell.id].cellMark = state;
      } else {
        console.log('That cell is already filled')
      }

      if (checkWin(board)) {
        if(state === 'X') {
          paragraph.textContent = `${nameX} wins`;
        } else {
          paragraph.textContent = `${nameO} wins`;
        }
        gameDone = true;

      } else if(checkDraw()) {
        paragraph.textContent = 'A draw!';
        gameDone = true
      }

      if(state === 'X') {
        state = 'O';
        paragraph.textContent = `${nameO}'s turn to play`
      } else if(state === 'O') {
        state = 'X';
        paragraph.textContent = `${nameX}'s turn to play`
      }
    }
  }

  const resetBoard = (e) => {
    gameDone = false;
    paragraph.textContent = `X's turn to play`
    board.forEach( cell => {
      cell.cellMark = 'empty';
      cell.DOM.textContent = '';
    })
    //Resets names
    inputO.disabled = false;
    inputO.value = '';
    inputX.disabled = false;
    inputX.value = '';
    buttonSetO.disabled = false;
    buttonSetX.disabled = false;
  }

  // Event listeners
  boardDOM.forEach( cell => {
    cell.addEventListener('click', cellClick);
  })
  buttonReset.forEach( button =>  {
    button.addEventListener('click', resetBoard);
  })
  buttonSetX.addEventListener('click', (e) => {
    if(inputX.value) {
      nameX = inputX.value;
      buttonSetX.disabled = true;
      inputX.disabled = true;
    }
  })
  buttonSetO.addEventListener('click', (e) => {
    if(inputO.value) {
      nameO = inputO.value;
      buttonSetO.disabled = true;
      inputO.disabled = true;
    }
  })

  function checkWin(board) {
    return WINNING_COMBINATIONS.some( COMBINATION => {
      return COMBINATION.every( index => board[index].cellMark === state)
    })
  }

  function checkDraw() {
    return board.every( cell => {
      return cell.cellMark != 'empty';
    })
  }
  
  return { board }
})();

let gameController = (() => {
  
  return {}
})();

let minMax = (() => {
  return {}
})();

//factories
const playerFactory = (name,turn,mark) => {
  return { name, turn, mark };
}
