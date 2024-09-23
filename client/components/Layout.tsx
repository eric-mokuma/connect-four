import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Board from './Board'
import Header from './Header'
import PlayerScore from './PlayerScore'
import useGameBoard from '../hook/useGameBoard'
import styles from './Board.module.css'

// Main Layout component for the game
export default function Layout() {
  // Destructure values from useGameBoard hook
  const {
    board,
    restartGame,
    handleChipClick,
    currentPlayer,
    isGameFinished,
    winner,
    scores,
  } = useGameBoard()

  const navigate = useNavigate() // Initialize navigation
  // Retrieve player names from localStorage, defaulting to 'Player 1' and 'Player 2'
  const player1Name = localStorage.getItem('player1Name') || 'Player 1'
  const player2Name = localStorage.getItem('player2Name') || 'Player 2'

  // Function to handle leaving the match
  const leaveMatch = () => {
    localStorage.removeItem('player1Name') // Clear player 1 name from localStorage
    localStorage.removeItem('player2Name') // Clear player 2 name from localStorage
    navigate('/') // Navigate back to the home page
  }

  // Function to determine the score color based on the winner
  const getScoreColor = (player: string) => {
    if (winner === 'red' && player === player1Name) return 'green' // Player 1 wins
    if (winner === 'yellow' && player === player2Name) return 'green' // Player 2 wins
    // Assign color based on player type
    return player === player1Name ? 'red' : 'yellow' // Default colors for players
  }

  return (
    <div className={styles.layout}>
      <Header onRestart={restartGame} onLeaveMatch={leaveMatch} />{' '}
      {/* Header with restart and leave buttons */}
      {isGameFinished && ( // Conditional rendering for game finish message
        <div className="win-message">
          {winner ? ( // Check if there's a winner
            <h2>{winner === 'red' ? player1Name : player2Name} wins!</h2> // Display winner's name
          ) : (
            <h2>It is a draw!</h2> // Display draw message
          )}
          <p>The game will restart shortly...</p>{' '}
          {/* Message about game restart */}
        </div>
      )}
      <div className={styles.content}>
        <PlayerScore
          player={player1Name} // Player 1's name
          score={scores.red} // Player 1's score
          color={getScoreColor(player1Name)} // Determine color for Player 1's score
        />
        <Board
          board={board} // Pass the game board state
          currentPlayer={currentPlayer} // Current player's turn
          onChipClick={handleChipClick} // Handle chip clicks
        />
        <PlayerScore
          player={player2Name} // Player 2's name
          score={scores.yellow} // Player 2's score
          color={getScoreColor(player2Name)} // Determine color for Player 2's score
        />
      </div>
      <footer className={styles.footer}>
        <p>@eric mokuma 2024, +642885144208</p>{' '}
        {/* Footer with contact information */}
      </footer>
      <Outlet /> {/* Render any child routes here */}
    </div>
  )
}
