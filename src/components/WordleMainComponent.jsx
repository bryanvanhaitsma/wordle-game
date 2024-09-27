import React, {useState} from 'react';

import Keyboard from './Keyboard';
import GameBoard from './GameBoard';
import { gameStateAfterDeletePressed, gameStateAfterEnterPressed, gameStateAfterLetterPressed, initialGameState } from '../gameLogic/GameStateManager';

function WordleMainComponent() {
  const [gameState, setGameState] = useState(initialGameState());

  const reset = () => setGameState(initialGameState());
  const letterCallback = (letter) => {
    setGameState(gameStateAfterLetterPressed(gameState, letter));
  };
  const enterCallback = () => {
    setGameState(gameStateAfterEnterPressed(gameState));
  };
  const deleteCallback = () => {
    setGameState(gameStateAfterDeletePressed(gameState));
  };

  return (
    <>
      <h1 className="text-center text-light"><strong>W O R D L E</strong></h1>
      <hr />
      <div className="row">
        <div className="col-12 text-center">
          <button className="btn btn-info">
            <a href="https://www.wikihow.org/Play-Wordle" target="_blank" rel="noreferrer">HELP</a>
          </button>
          &nbsp;
          <button className="btn btn-warning" onClick={reset}>RESET</button>
        </div>
      </div>
      <GameBoard rows={gameState.rows} />
      <br />
      {
        gameState.gameOver && (
          <>
            <h4 className="text-center">Game completed. The answer is: {gameState.chosenWord}</h4>
            <br />
          </>
        )
      }
      <Keyboard 
        gameOver={gameState.gameOver} 
        letters={gameState.letters} 
        letterCallback={letterCallback}
        enterCallback={enterCallback}
        deleteCallback={deleteCallback}
      />
    </>
  )
}

export default WordleMainComponent