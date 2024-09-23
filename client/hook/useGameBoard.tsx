import { useState } from 'react'
import { generateBoard, checkForPlayerWin } from '../utils/gameUtils'
import { Chip, CurrentPlayer } from './types'

type PlayerKey = 'red' | 'yellow'

export default function useGameBoard() {
  const [board, setBoard] = useState<Chip[][]>(generateBoard())
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('red')
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const [winner, setWinner] = useState<CurrentPlayer | null>(null)
  const [scores, setScores] = useState<{ red: number; yellow: number }>({
    red: 0,
    yellow: 0,
  })

  const handleChipClick = (colIndex: number) => {
    if (isGameFinished) return

    const newBoard = [...board]
    for (let row = newBoard.length - 1; row >= 0; row--) {
      if (!newBoard[row][colIndex].value) {
        newBoard[row][colIndex].value = currentPlayer
        break
      }
    }

    const winningPlayer = checkForPlayerWin(newBoard)
    if (winningPlayer) {
      setIsGameFinished(true)
      setWinner(winningPlayer)

      const playerKey: PlayerKey = winningPlayer.toLowerCase() as PlayerKey

      setScores((prevScores) => ({
        ...prevScores,
        [playerKey]: prevScores[playerKey] + 1,
      }))

      setTimeout(() => restartGame(), 3000)
    } else {
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red')
    }

    setBoard(newBoard)
  }

  const restartGame = () => {
    setBoard(generateBoard())
    setCurrentPlayer('red')
    setIsGameFinished(false)
    setWinner(null)
  }

  return {
    board,
    currentPlayer,
    isGameFinished,
    winner,
    handleChipClick,
    restartGame,
    scores,
  }
}
