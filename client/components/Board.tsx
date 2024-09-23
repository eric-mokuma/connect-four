import styles from './Board.module.css'
import PlayerTurn from './PlayerTurn'
import { Chip } from '../hook/types'

// Define the properties that the Board component will accept
interface BoardProps {
  board: Chip[][] // 2D array representing the game board
  currentPlayer: string // Current player's identifier
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
    return <div>Error: Invalid board structure.</div> // Render error message if board structure is invalid
  }

  // Handle key presses for accessibility (Enter or Space)
  const handleKeyPress = (event: React.KeyboardEvent, colIndex: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onChipClick(colIndex) // Call the onChipClick function with the column index
    }
  }

  return (
    <div className={styles.board}>
      {' '}
      {/* Main container for the board */}
      <PlayerTurn currentPlayer={currentPlayer} />{' '}
      {/* Display the current player */}
      {board.map(
        (
          row,
          rowIndex, // Map through each row of the board
        ) => (
          <div key={rowIndex} className={styles.row}>
            {' '}
            {/* Container for each row */}
            {row.map(
              (
                chip,
                colIndex, // Map through each chip in the row
              ) => (
                <div
                  key={colIndex} // Unique key for each cell
                  className={styles.cell} // Cell styling
                  role="button" // Indicate that this div is interactive
                  tabIndex={0} // Make the div focusable
                  onClick={() => onChipClick(colIndex)} // Handle click to place a chip
                  onKeyPress={(event) => handleKeyPress(event, colIndex)} // Handle key press for accessibility
                  aria-label={`Place a chip in column ${colIndex + 1}`} // Accessibility label
                >
                  <div
                    className={`${styles.chip} ${chip.value ? styles[chip.value] : styles.default}`} // Chip styling based on value
                  />
                </div>
              ),
            )}
          </div>
        ),
      )}
    </div>
  )
}
