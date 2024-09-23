// Define the Props interface to specify the expected structure of the component's props
interface Props {
  currentPlayer: 'red' | 'yellow' // currentPlayer can be either 'red' or 'yellow'
}

// Retrieve player names from local storage, defaulting to 'Player 1' and 'Player 2' if not found
const player1Name = localStorage.getItem('player1Name') || 'Player 1'
const player2Name = localStorage.getItem('player2Name') || 'Player 2'

// Define the PlayerTurn functional component
export default function PlayerTurn({ currentPlayer }: Props) {
  return (
    <div className="player-turn">
      {/* Display the current player's turn based on the value of currentPlayer */}
      {currentPlayer === 'red'
        ? `${player1Name}'s turn` // If currentPlayer is 'red', show player 1's turn
        : `${player2Name}'s turn`}{' '}
    </div>
  )
}
