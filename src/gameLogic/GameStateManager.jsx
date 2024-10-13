import { isValidWord } from "./WordRepository";

const NUM_ROWS = 6
const NUM_COLS = 5

const CELL_STATE = {
  default: {
    buttonClassName: 'btn-primary',
    keyboardClassName: 'btn-light',
  },
  incorrectLetter: {
    buttonClassName: 'btn-secondary',
    keyboardClassName: 'btn-secondary',
  },
  correctLetter: {
    buttonClassName: 'btn-warning',
    keyboardClassName: 'btn-warning',
  },
  correctPosition: {
    buttonClassName: 'btn-success',
    keyboardClassName: 'btn-success',
  },
}

function initialCellState() {
  return {
    letter: null,
    state: CELL_STATE.default,
  }
}


export function initialGameState() {
  return {
    chosenWord: '',
    rows: Array(NUM_ROWS).fill(Array(NUM_COLS).fill(initialCellState())),
    letters: Array(26).fill(CELL_STATE.default),
    currentRow: 0,
    currentCol: 0,
    gameOver: false,
    gameReset: false,
    rowShake: false,
  }
}


export function getIndexOfLetter(letter) {
  return letter.charCodeAt(0) - 'A'.charCodeAt(0);
}


function letterCount(word, letter) {
  let count = 0;
  for (let char of word) {
    if (char === letter) {
      count++;
    }
  }
  return count;
}


export function gameStateAfterLetterPressed(gameState, letter) {
  if (gameState.currentCol === NUM_COLS || gameState.gameOver) {
    return gameState;
  }
  const newRows = JSON.parse(JSON.stringify(gameState.rows));
  newRows[gameState.currentRow][gameState.currentCol] = {
    ...newRows[gameState.currentRow][gameState.currentCol],
    letter: letter
  };

  return {
    ...gameState,
    rows: newRows,
    currentCol: gameState.currentCol + 1,
  };
}


export async function gameStateAfterEnterPressed(gameState) {
  
  if (gameState.currentCol !== NUM_COLS || gameState.gameOver) {
    return gameState;
  } 

  // if word not found in word shake and clear line
  const currentGuess = gameState.rows[gameState.currentRow].map(obj => obj.letter).join('');
  const valid = await isValidWord(currentGuess);
  if (!valid) {
    const updatedRows = gameState.rows.map((row, index) => {
      if (index === gameState.currentRow) {
        return Array(NUM_COLS).fill(initialCellState());
      } 
      return row; 
    })
    return {
      ...gameState,
      currentCol: 0,
      rowShake: true,
      rows: updatedRows,
    };
  } 

  const newRows = JSON.parse(JSON.stringify(gameState.rows));
  const newLetters = JSON.parse(JSON.stringify(gameState.letters));
  let allCorrect = true;
  const currentRowArray = newRows[gameState.currentRow];
  
  for (let i = 0; i < NUM_COLS; i++) {
    const curLetter = currentRowArray[i].letter;
    const countInAnswer = letterCount(gameState.chosenWord, curLetter);
    const countInGuess = letterCount(currentGuess, curLetter);
    console.log(countInAnswer, countInGuess);


    if (countInAnswer === 0) {

      currentRowArray[i].state = CELL_STATE.incorrectLetter;
      const letterIndex = curLetter.charCodeAt(0) - 65;
      newLetters[letterIndex] = CELL_STATE.incorrectLetter;
      allCorrect = false;

    } else if (countInAnswer === 1) {

      if (gameState.chosenWord.charAt(i) === curLetter) {
        currentRowArray[i].state = CELL_STATE.correctPosition;
        const letterIndex = curLetter.charCodeAt(0) - 65; 
        newLetters[letterIndex] = CELL_STATE.correctPosition;
      } else if (gameState.chosenWord.indexOf(curLetter) !== -1) {
        currentRowArray[i].state = CELL_STATE.correctLetter;
        allCorrect = false;
      }

    }


    
  }
  
  return {
    ...gameState,
    rows: newRows,
    letters: newLetters,
    currentRow: gameState.currentRow + 1,
    currentCol: 0,
    gameOver: allCorrect || gameState.currentRow - 1 === NUM_ROWS,
  }
}


export function gameStateAfterDeletePressed(gameState) {
  if (gameState.currentCol === 0 || gameState.gameOver) {
    return gameState;
  } 
  const newRows = JSON.parse(JSON.stringify(gameState.rows));
  newRows[gameState.currentRow][gameState.currentCol - 1] = initialCellState();

  return {
    ...gameState,
    rows: newRows,
    currentCol: gameState.currentCol - 1,
  };
}