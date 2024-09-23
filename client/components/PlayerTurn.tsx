interface PlayerTurnProps {
  currentPlayer: 'red' | 'yellow'
}

const player1Name = localStorage.getItem('player1Name') || 'Player 1'
const player2Name = localStorage.getItem('player2Name') || 'Player 2'

export default function PlayerTurn({ currentPlayer }: PlayerTurnProps) {
  return (
    <div className="player-turn">
      {currentPlayer === 'red'
        ? `${player1Name}'s turn`
        : `${player2Name}'s turn`}
    </div>
  )
}
