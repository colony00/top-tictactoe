// module
let gameBoard = (() => {
  let board = [];
  let state = "X";
  let gameDone = false;
  const boardDOM = document.querySelectorAll(".cell");
  const buttonReset = document.querySelectorAll(".reset");
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
        // Der skal en smart måde til at finde ud af hvis tur det er
        cell.textContent = state;
        board[cell.id].cellMark = state;
      } else {
        console.log('That cell is already filled')
      }

      if (checkWin(board)) {
        alert(`${state} wins`);
        gameDone = true;

      } else if(checkDraw()) {
        alert('A draw!');
        gameDone = true
      }

      if(state=='X') {
        state='O';
      } else if(state==='O') {
        state='X';
      }
    }
  }

  const resetBoard = (e) => {
    gameDone = false;
    board.forEach( cell => {
      cell.cellMark = 'empty';
      cell.DOM.textContent = '';
    })
  }

  // Event listeners
  boardDOM.forEach( cell => {
    cell.addEventListener('click', cellClick);
  })
  buttonReset.forEach( button =>  {
    button.addEventListener('click', resetBoard);
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
