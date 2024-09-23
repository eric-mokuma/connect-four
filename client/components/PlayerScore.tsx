import styles from './Board.module.css'

interface PlayerScoreProps {
  player: string
  score: number
  color: string
}

export default function PlayerScore({
  player,
  score,
  color,
}: PlayerScoreProps) {
  const backgroundColor =
    color === 'red' ? 'rgb(253, 102, 135)' : 'rgb(255, 206, 103)'

  return (
    <div className={styles.playerScore} style={{ backgroundColor }}>
      <h3>{player}</h3>
      <p style={{ color: 'white' }}>
        <strong>{score}</strong>
      </p>
    </div>
  )
}
