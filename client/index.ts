import { Chip } from './hook/types'

export const generateBoard = (): Chip[] => {
  const board: Chip[] = []
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 7; x++) {
      board.push({
        value: null,
        position: { x, y },
        index: y * 7 + x,
      })
    }
  }
  return board
}

export const checkForPlayerWin = (board: Chip[]): 'red' | 'yellow' | null => {
  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
  ]

  const isWinningMove = (
    x: number,
    y: number,
    player: 'red' | 'yellow',
  ): boolean => {
    for (const { x: dx, y: dy } of directions) {
      let count = 1

      for (let step = 1; step < 4; step++) {
        const newX = x + dx * step
        const newY = y + dy * step
        if (
          board.find(
            (chip) => chip.position.x === newX && chip.position.y === newY,
          )?.value === player
        ) {
          count++
        } else {
          break
        }
      }

      for (let step = 1; step < 4; step++) {
        const newX = x - dx * step
        const newY = y - dy * step
        if (
          board.find(
            (chip) => chip.position.x === newX && chip.position.y === newY,
          )?.value === player
        ) {
          count++
        } else {
          break
        }
      }

      if (count >= 4) return true
    }
    return false
  }

  for (const chip of board) {
    if (
      chip.value !== null &&
      isWinningMove(chip.position.x, chip.position.y, chip.value)
    ) {
      return chip.value
    }
  }

  return null
}

export * from './hook/types'
