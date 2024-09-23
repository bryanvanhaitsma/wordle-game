import React from 'react'
import { getIndexOfLetter } from '../gameLogic/GameStateManager';

function Keyboard({gameOver, letters, letterCallback}) {

  const keyArrangement = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <>
      {
        keyArrangement.map((row, rowIndex) => (
          <div key={'row_' + rowIndex} className="col-12 text-center">
            {
              row.map((letter, letterIndex) => (
                <button
                  style={{margin: '2px'}}
                  key={'cell_' + rowIndex + '_' + letterIndex}
                  className={'btn btn-lg ' + letters[getIndexOfLetter[letter]].keyboardClassName}
                  onClick={() => letterCallback(letter) }
                  disabled={gameOver}
                >
                  {letter}
                </button>
              ))
            }
          </div>
        ))
      }
    </>
  )
}

export default Keyboard