import React from 'react'
import styles from './Board.module.css'

interface PlayerScoreProps {
  player: string
  score: number
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ player, score }) => {
  return (
    <div className={styles.playerScore}>
      <h3>{player}</h3>
      <p>Score: {score}</p>
    </div>
  )
}

export default PlayerScore
