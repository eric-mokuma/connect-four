import React from 'react'
import { Chip as ChipI, CurrentPlayer, OnChipClick } from '../types'

interface ChipProps {
  chip: ChipI
  currentPlayer: CurrentPlayer
  onClick: OnChipClick
}

const PlayerTurn: React.FC<ChipProps> = ({ chip, currentPlayer, onClick }) => {
  const { value } = chip
  const baseClass = 'chip'
  const valueClass =
    value === 'red' ? 'red' : value === 'yellow' ? 'yellow' : 'default'
  const hoverClass =
    value !== null ? '' : currentPlayer === 'red' ? 'hover-red' : 'hover-yellow'

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick(chip, currentPlayer)
    }
  }

  return (
    <div
      className={`${baseClass} ${valueClass} ${hoverClass}`}
      onClick={() => onClick(chip, currentPlayer)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    ></div>
  )
}

export default PlayerTurn
