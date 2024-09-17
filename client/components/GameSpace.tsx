import React from 'react'
import PlayerT from './PlayerT'
import { Chip as ChipI, CurrentPlayer, OnChipClick } from '../types'
import styles from './Board.module.css'

interface BoardProps {
  board: ChipI[]
  onChipClick: OnChipClick
  currentPlayer: CurrentPlayer
}

const Board: React.FC<BoardProps> = ({ board, currentPlayer, onChipClick }) => {
  return (
    <div className={styles.gridWrapper}>
      {board.map((cell, i) => (
        <PlayerT
          key={i}
          chip={cell}
          onClick={onChipClick}
          currentPlayer={currentPlayer}
        />
      ))}
    </div>
  )
}

export default Board
