import React from 'react';
import "../styles/styles.css";

function GameBoard({ rows, rowShake, currentRow, onAnimationEnd }) {

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div 
          key={'row_' + rowIndex} 
          className={rowShake && currentRow === rowIndex ? "col-12 text-center shake-animation" : "col-12 text-center"}
          onAnimationEnd={onAnimationEnd}
        >
          {row.map((cell, cellIndex) => (
            <button
              style={{margin: "2px", fontFamily: 'Courier New'}}
              key={'row_' + rowIndex + 'cell_' + cellIndex}
              disabled={true}
              className={'btn btn-lg ' + cell.state.buttonClassName}
            >
              <strong>{cell.letter || '_'}</strong>
            </button>
          ))}
        </div>
      ))}
    </>
  )
}

export default GameBoard