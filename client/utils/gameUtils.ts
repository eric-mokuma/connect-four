import { Chip, CurrentPlayer } from '../hook/types'

// Function to generate a game board represented as a 2D array of Chips
export const generateBoard = (): Chip[][] => {
  const rows = 6 // Number of rows in the board
  const cols = 7 // Number of columns in the board
  // Create a 2D array filled with Chips, each initialized with null value and its position
  const board: Chip[][] = Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x) => ({
      value: null, // Initial chip value is null
      position: { x, y }, // Position of the chip in the board
      index: y * cols + x, // Unique index based on its position
    })),
  )
  return board // Return the generated board
}

// Function to check if a player has won the game
export const checkForPlayerWin = (board: Chip[][]): CurrentPlayer | null => {
  // Directions to check for winning combinations (horizontal, vertical, diagonal)
  const directions = [
    { x: 1, y: 0 }, // Horizontal (right)
    { x: 0, y: 1 }, // Vertical (down)
    { x: 1, y: 1 }, // Diagonal (bottom right)
    { x: 1, y: -1 }, // Diagonal (bottom left)
  ]

  // Iterate through each row in the board
  for (const row of board) {
    // Iterate through each chip in the row
    for (const chip of row) {
      // Check if the chip has a value (not null)
      if (chip.value) {
        // Check in each direction for a winning combination
        for (const { x: dx, y: dy } of directions) {
          if (checkDirection(board, chip, dx, dy)) {
            return chip.value // Return the player's value if a win is found
          }
        }
      }
    }
  }

  return null
}

// Helper function to check a specific direction for a win
const checkDirection = (
  board: Chip[][],
  chip: Chip,
  dx: number,
  dy: number,
): boolean => {
  let count = 1

  // Check in the positive direction (dx, dy)
  for (let i = 1; i < 4; i++) {
    const x = chip.position.x + dx * i // Calculate new x position
    const y = chip.position.y + dy * i // Calculate new y position
    // Find the chip at the new position
    const foundChip = board
      .flat()
      .find((c) => c.position.x === x && c.position.y === y)
    // If a matching chip is found, increment the count
    if (foundChip && foundChip.value === chip.value) {
      count++
    } else {
      break // Stop checking if no match is found
    }
  }

  // Check in the negative direction (-dx, -dy)
  for (let i = 1; i < 4; i++) {
    const x = chip.position.x - dx * i // Calculate new x position
    const y = chip.position.y - dy * i // Calculate new y position
    // Find the chip at the new position
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
