export type Chip = {
  value: 'red' | 'yellow' | null
  position: { x: number; y: number }
  index: number
}

export type CurrentPlayer = 'red' | 'yellow'
