import { Chip, CurrentPlayer } from '../hook/types'

export const generateBoard = (): Chip[][] => {
  const rows = 6
  const cols = 7
  const board: Chip[][] = Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x) => ({
      value: null,
      position: { x, y },
      index: y * cols + x,
    })),
  )
  return board
}

export const checkForPlayerWin = (board: Chip[][]): CurrentPlayer | null => {
  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
  ]

  for (const row of board) {
    for (const chip of row) {
      if (chip.value) {
        for (const { x: dx, y: dy } of directions) {
          if (checkDirection(board, chip, dx, dy)) {
            return chip.value
          }
        }
      }
    }
  }

  return null
}

const checkDirection = (
  board: Chip[][],
  chip: Chip,
  dx: number,
  dy: number,
): boolean => {
  let count = 1

  for (let i = 1; i < 4; i++) {
    const x = chip.position.x + dx * i
    const y = chip.position.y + dy * i
    const foundChip = board
      .flat()
      .find((c) => c.position.x === x && c.position.y === y)
    if (foundChip && foundChip.value === chip.value) {
      count++
    } else {
      break
    }
  }

  for (let i = 1; i < 4; i++) {
    const x = chip.position.x - dx * i
    const y = chip.position.y - dy * i
    const foundChip = board
      .flat()
      .find((c) => c.position.x === x && c.position.y === y)
    if (foundChip && foundChip.value === chip.value) {
      count++
    } else {
      break
    }
  }

  return count >= 4
}
