import React, {useState} from 'react';

import Keyboard from './Keyboard';
import GameBoard from './GameBoard';
import { initialGameState } from '../gameLogic/GameStateManager';

function WordleMainComponent() {
  const [gameState, setGameState] = useState(initialGameState());

  const reset = () => setGameState(initialGameState());

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
      <Keyboard />
    </>
  )
}

export default WordleMainComponent