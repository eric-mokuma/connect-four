import '../main.css'
import PlayerTurn from './PlayerTurn'
import { Chip } from '../hook/types'

// Define the properties that the Board component will accept
interface BoardProps {
  board: Chip[][]
  currentPlayer: 'red' | 'yellow' // Restrict currentPlayer to 'red' | 'yellow'
  onChipClick: (columnIndex: number) => void
}

// Define the Board component
export default function Board({
  board,
  currentPlayer,
  onChipClick,
}: BoardProps) {
  // Validate that the board is a 2D array
  if (!Array.isArray(board) || !Array.isArray(board[0])) {
    return <div>Error: Invalid board structure.</div>
  }

  // Handle key presses for accessibility (Enter or Space)
  const handleKeyPress = (event: React.KeyboardEvent, colIndex: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onChipClick(colIndex)
    }
  }

  return (
    <div className="board">
      <PlayerTurn currentPlayer={currentPlayer} />
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((chip, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              role="button"
              tabIndex={0}
              onClick={() => onChipClick(colIndex)}
              onKeyPress={(event) => handleKeyPress(event, colIndex)}
              aria-label={`Place a chip in column ${colIndex + 1}`}
            >
              <div className={`chip ${chip.value ? chip.value : 'default'}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
