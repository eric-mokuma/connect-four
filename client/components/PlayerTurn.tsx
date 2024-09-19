import React from 'react'

interface PlayerTurnProps {
  currentPlayer: string
}

const PlayerTurn: React.FC<PlayerTurnProps> = ({ currentPlayer }) => {
  return <div className="player-turn">{currentPlayer}&apos;s turn</div>
}

export default PlayerTurn
