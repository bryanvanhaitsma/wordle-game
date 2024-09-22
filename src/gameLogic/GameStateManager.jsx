const NUM_ROWS = 6
const NUM_COLS = 5

const CELL_STATE = {
  default: {
    buttonClassName: 'btn-primary',
  },
  incorrectLetter: {
    buttonClassName: 'btn-secondary',
  },
  correctLetter: {
    buttonClassName: 'btn-warning',
  },
  correctPosition: {
    buttonClassName: 'btn-success',
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
    rows: Array(NUM_ROWS).fill(Array(NUM_COLS).fill(initialCellState())),
  }
}