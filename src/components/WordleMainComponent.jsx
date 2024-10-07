import React, {useState, useEffect} from 'react';

import Keyboard from './Keyboard';
import GameBoard from './GameBoard';
import { gameStateAfterDeletePressed, gameStateAfterEnterPressed, gameStateAfterLetterPressed, initialGameState } from '../gameLogic/GameStateManager';
import { getRandomWord } from '../gameLogic/WordRepository';

function WordleMainComponent() {
  const [gameState, setGameState] = useState(initialGameState());
  const reset = () => setGameState(initialGameState());

  useEffect(() => {
    async function loadWord() {      
      const word = await getRandomWord();
      setGameState((curGameState) => ({
        ...curGameState,
        chosenWord: word,
      }));
    }
    loadWord();

  }, []);

  const letterCallback = (letter) => {
    setGameState(gameStateAfterLetterPressed(gameState, letter));
  };
  const enterCallback = async () => {
    const newState = await gameStateAfterEnterPressed(gameState);
    setGameState(newState);
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
      <GameBoard rows={gameState.rows} rowShake={gameState.rowShake} currentRow={gameState.currentRow} />
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