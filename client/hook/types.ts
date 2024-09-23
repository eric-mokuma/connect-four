// Define a type for a Chip object
export type Chip = {
  // The color of the chip, which can be 'red', 'yellow', or null (no chip)
  value: 'red' | 'yellow' | null

  // The position of the chip on a 2D plane, represented by x and y coordinates
  position: { x: number; y: number }

  // The index of the chip, which can be used to track its order or placement
  index: number
}

// Define a type for the CurrentPlayer, which can be either 'red' or 'yellow'
export type CurrentPlayer = 'red' | 'yellow'
