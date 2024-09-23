import styles from './Board.module.css'

// Define the types for the props this component will receive
interface Props {
  player: string // Name of the player
  score: number // Player's score
  color: string // Color indicating player type (e.g., 'red' or another color)
}

// Functional component to display the player's score
export default function PlayerScore({
  player, // Destructure player prop
  score, // Destructure score prop
  color, // Destructure color prop
}: Props) {
  // Determine the background color based on the player's color
  const backgroundColor =
    color === 'red' ? 'rgb(253, 102, 135)' : 'rgb(255, 206, 103)'

  return (
    <div className={styles.playerScore} style={{ backgroundColor }}>
      {' '}
      {/* Apply styles and background color */}
      <h3>{player}</h3> {/* Display player's name */}
      <p style={{ color: 'white' }}>
        {' '}
        {/* Set text color to white for contrast */}
        <strong>{score}</strong> {/* Display player's score in bold */}
      </p>
    </div>
  )
}
