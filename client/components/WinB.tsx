import React from 'react'
import Button from './Btn'

interface WinnerBoardProps {
  whichPlayerWon: string
  onRestart: () => void
}

const WinnerBoard: React.FC<WinnerBoardProps> = ({
  onRestart,
  whichPlayerWon,
}) => {
  return (
    <div className="wrapper">
      <h3 className="h2">Player {whichPlayerWon === 'red' ? '1' : '2'}</h3>
      <h1 className="h1">WINS</h1>
      <Button onClick={onRestart}>Play again</Button>
    </div>
  )
}

export default WinnerBoard
