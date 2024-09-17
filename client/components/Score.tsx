import React from 'react'

interface PlayerScoreProps {
  player: 'red' | 'yellow'
  score: number
}

const Score: React.FC<PlayerScoreProps> = ({ player, score }) => {
  return (
    <div className="wrapper">
      <div className={`color-circle ${player}`}></div>
      <h2 className="player">{player === 'red' ? 'Player 1' : 'Player 2'}</h2>
      <h1 className="score">{score}</h1>
    </div>
  )
}

export default Score
