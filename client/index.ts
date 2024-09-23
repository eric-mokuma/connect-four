import { Chip } from './hook/types'

// Function to generate the game board with a 6x7 grid
export const generateBoard = (): Chip[] => {
  const board: Chip[] = [] // Initialize an empty array for the board
  // Loop through rows (y-axis)
  for (let y = 0; y < 6; y++) {
    // Loop through columns (x-axis)
    for (let x = 0; x < 7; x++) {
      // Push a new Chip object for each position on the board
      board.push({
        value: null, // Initially, no player has placed a chip here
        position: { x, y }, // Store the chip's position
        index: y * 7 + x, // Calculate a unique index for each position
      })
    }
  }
  return board // Return the completed board
}

// Function to check for a winning player on the board
export const checkForPlayerWin = (board: Chip[]): 'red' | 'yellow' | null => {
  // Define possible directions for winning combinations
  const directions = [
    { x: 1, y: 0 }, // Horizontal
    { x: 0, y: 1 }, // Vertical
    { x: 1, y: 1 }, // Diagonal down-right
    { x: 1, y: -1 }, // Diagonal up-right
  ]

  // Helper function to check if the current move is a winning move
  const isWinningMove = (
    x: number,
    y: number,
    player: 'red' | 'yellow',
  ): boolean => {
    // Check in each direction for a winning combination
    for (const { x: dx, y: dy } of directions) {
      let count = 1 // Start counting from the current chip

      // Check in the positive direction
      for (let step = 1; step < 4; step++) {
        const newX = x + dx * step // Calculate the new x position
        const newY = y + dy * step // Calculate the new y position
        // Check if the chip in the new position belongs to the current player
        if (
          board.find(
            (chip) => chip.position.x === newX && chip.position.y === newY,
          )?.value === player
        ) {
          count++ // Increment count if it's a match
        } else {
          break // Stop checking if there's no match
        }
      }

      // Check in the negative direction
      for (let step = 1; step < 4; step++) {
        const newX = x - dx * step // Calculate the new x position
        const newY = y - dy * step // Calculate the new y position
        // Check if the chip in the new position belongs to the current player
        if (
          board.find(
            (chip) => chip.position.x === newX && chip.position.y === newY,
          )?.value === player
        ) {
          count++ // Increment count if it's a match
        } else {
          break // Stop checking if there's no match
        }
      }

      // If count reaches 4, return true indicating a win
      if (count >= 4) return true
    }
    return false // No winning combination found in this direction
  }

  // Loop through each chip on the board to check for a win
  for (const chip of board) {
    // Ensure the chip has a value (not null) and check if it's a winning move
    if (
      chip.value !== null &&
      isWinningMove(chip.position.x, chip.position.y, chip.value)
    ) {
      return chip.value // Return the winning player ('red' or 'yellow')
    }
  }

  return null // No winner found, return null
}

// Export types for use in other modules
export * from './hook/types'
