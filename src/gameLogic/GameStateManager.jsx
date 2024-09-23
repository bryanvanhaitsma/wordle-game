import { getRandomWord } from "./WordRepository";

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
    chosenWord: getRandomWord,
    rows: Array(NUM_ROWS).fill(Array(NUM_COLS).fill(initialCellState())),
    letters: Array(26).fill(CELL_STATE.default),
    gameOver: false,
  }
}

export function getIndexOfLetter(letter) {
  return letter.charCodeAt(0) - 'A'.charCodeAt(0);
}