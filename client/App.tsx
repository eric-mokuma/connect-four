import React from 'react'
import Header from './components/Header'
import Board from './components/GameSpace'
import useGameBoard from './hooks/useGame'
import PlayerScore from './components/Score'
import PlayerTurn from './components/PlayerTurn'
import WinnerBoard from './components/WinB'

const App = () => {
  const {
    board,
    onRestart,
    onChipClick,
    currentPlayer,
    isGameFinished,
    whichPlayerWon,
    playersScore,
  } = useGameBoard()

  return (
    <main>
      <Header onRestart={onRestart} />
      <div className="board-wrapper">
        <PlayerScore player="red" score={playersScore['player1']} />
        <Board
          board={board}
          onChipClick={onChipClick}
          currentPlayer={currentPlayer}
        />
        <PlayerScore player="yellow" score={playersScore['player2']} />
      </div>

      <div className="footer-wrapper">
        {isGameFinished && whichPlayerWon ? (
          <WinnerBoard onRestart={onRestart} whichPlayerWon={whichPlayerWon} />
        ) : (
          <PlayerTurn currentPlayer={currentPlayer} />
        )}
      </div>
    </main>
  )
}

export default App
