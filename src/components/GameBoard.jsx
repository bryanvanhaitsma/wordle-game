import React from 'react';

function GameBoard({ rows }) {
  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={'row_' + rowIndex} className="col 12 text-center">
          {row.map((cell, cellIndex) => (
            <button
              style={{margin: "2px", fontFamily: 'Courier New'}}
              key={'row_' + rowIndex + 'cell_' + cellIndex}
              disabled={true}
              className={'btn btn-lg' + cell.state.buttonClassName}
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