import '../main.css'

// Define the types for the props this component will receive
interface Props {
  player: string
  score: number
  color: string
}

// Functional component to display the player's score
export default function PlayerScore({ player, score, color }: Props) {
  // Determine the background color based on the player's color
  const backgroundColor =
    color === 'red' ? 'rgb(253, 102, 135)' : 'rgb(255, 206, 103)'

  return (
    <div className="playerScore" style={{ backgroundColor }}>
      <h3>{player}</h3>
      <p style={{ color: 'white' }}>
        <strong>{score}</strong>
      </p>
    </div>
  )
}
