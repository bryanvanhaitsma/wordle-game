import React, {useState} from 'react';

import Keyboard from './Keyboard';
import GameBoard from './GameBoard';
import { initialGameState } from '../gameLogic/GameStateManager';

function WordleMainComponent() {
  const [gameState, setGameState] = useState(initialGameState());

  return (
    <>
      <GameBoard rows={gameState.rows} />
      <Keyboard />
    </>
  )
}

export default WordleMainComponent