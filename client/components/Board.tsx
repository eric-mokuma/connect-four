import styles from './Board.module.css'
import PlayerTurn from './PlayerTurn'
import { Chip } from '../hook/types'

interface BoardProps {
  board: Chip[][]
  currentPlayer: string
  onChipClick: (columnIndex: number) => void
}

export default function Board({
  board,
  currentPlayer,
  onChipClick,
}: BoardProps) {
  if (!Array.isArray(board) || !Array.isArray(board[0])) {
    return <div>Error: Invalid board structure.</div>
  }

  const handleKeyPress = (event: React.KeyboardEvent, colIndex: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onChipClick(colIndex)
    }
  }

  return (
    <div className={styles.board}>
      <PlayerTurn currentPlayer={currentPlayer} />
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((chip, colIndex) => (
            <div
              key={colIndex}
              className={styles.cell}
              role="button"
              tabIndex={0}
              onClick={() => onChipClick(colIndex)}
              onKeyPress={(event) => handleKeyPress(event, colIndex)}
              aria-label={`Place a chip in column ${colIndex + 1}`}
            >
              <div
                className={`${styles.chip} ${chip.value ? styles[chip.value] : styles.default}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
