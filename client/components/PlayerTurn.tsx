interface Props {
  currentPlayer: 'red' | 'yellow'
}

// Retrieve player names from local storage, defaulting to 'Player 1' and 'Player 2' if not found
const player1Name = localStorage.getItem('player1Name') || 'Player 1'
const player2Name = localStorage.getItem('player2Name') || 'Player 2'

// Define the PlayerTurn functional component
export default function PlayerTurn({ currentPlayer }: Props) {
  return (
    <div className="player-turn">
      {currentPlayer === 'red'
        ? `${player1Name}'s turn`
        : `${player2Name}'s turn`}{' '}
    </div>
  )
}
