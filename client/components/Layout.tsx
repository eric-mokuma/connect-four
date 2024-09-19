import { Outlet } from 'react-router-dom'
import Board from './Board'
import Header from './Header'
import PlayerScore from './PlayerScore'
import useGameBoard from '../hook/useGameBoard'
import styles from './Board.module.css'

const Layout = () => {
  const {
    board,
    restartGame,
    handleChipClick,
    currentPlayer,
    isGameFinished,
    winner,
    scores,
  } = useGameBoard()

  const leaveMatch = () => {
    console.log('Match left')
  }

  return (
    <div className={styles.layout}>
      <Header onRestart={restartGame} onLeaveMatch={leaveMatch} />
      {isGameFinished && (
        <div className="win-message">
          <h2>{winner} wins!</h2>
          <p>The game will restart shortly...</p>
        </div>
      )}
      <div className={styles.content}>
        <PlayerScore player="Player 1" score={scores.red} />
        <Board
          board={board}
          currentPlayer={currentPlayer}
          onChipClick={handleChipClick}
        />
        <PlayerScore player="Player 2" score={scores.yellow} />
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
