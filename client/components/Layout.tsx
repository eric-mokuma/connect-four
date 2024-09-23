import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Board from './Board'
import Header from './Header'
import PlayerScore from './PlayerScore'
import useGameBoard from '../hook/useGameBoard'
import styles from './Board.module.css'

export default function Layout() {
  const {
    board,
    restartGame,
    handleChipClick,
    currentPlayer,
    isGameFinished,
    winner,
    scores,
  } = useGameBoard()

  const navigate = useNavigate()
  const player1Name = localStorage.getItem('player1Name') || 'Player 1'
  const player2Name = localStorage.getItem('player2Name') || 'Player 2'

  const leaveMatch = () => {
    localStorage.removeItem('player1Name')
    localStorage.removeItem('player2Name')
    navigate('/')
  }

  const getScoreColor = (player: string) => {
    if (winner === 'red' && player === player1Name) return 'green'
    if (winner === 'yellow' && player === player2Name) return 'green'
    return player === player1Name ? 'red' : 'yellow'
  }

  return (
    <div className={styles.layout}>
      <Header onRestart={restartGame} onLeaveMatch={leaveMatch} />
      {isGameFinished && (
        <div className="win-message">
          {winner ? (
            <h2>{winner === 'red' ? player1Name : player2Name} wins!</h2>
          ) : (
            <h2>It is a draw!</h2>
          )}
          <p>The game will restart shortly...</p>
        </div>
      )}
      <div className={styles.content}>
        <PlayerScore
          player={player1Name}
          score={scores.red}
          color={getScoreColor(player1Name)}
        />
        <Board
          board={board}
          currentPlayer={currentPlayer}
          onChipClick={handleChipClick}
        />
        <PlayerScore
          player={player2Name}
          score={scores.yellow}
          color={getScoreColor(player2Name)}
        />
      </div>
      <footer className={styles.footer}>
        <p>@eric mokuma 2024, +642885144208</p>
      </footer>
      <Outlet />
    </div>
  )
}
