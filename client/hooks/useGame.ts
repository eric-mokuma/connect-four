import { useState, useCallback } from 'react'
import { Chip, CurrentPlayer } from '../types'
import { checkForPlayerWin, generateBoard } from '../index'

const BOTTOM_BORDER = 6

const useGameBoard = () => {
  const [board, setBoard] = useState<Chip[]>(generateBoard())
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('red')
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [whichPlayerWon, setWhichPlayerWon] = useState<string | undefined>()
  const [playersScore, setPlayersScore] = useState({ player1: 0, player2: 0 })

  const onRestart = useCallback(() => {
    setBoard(generateBoard())
    setIsGameFinished(false)
    setWhichPlayerWon(undefined)
  }, [])

  const findAvailableRowIndex = (boardState: Chip[], x: number): number => {
    for (let i = 0; i <= BOTTOM_BORDER; i++) {
      const index = boardState.findIndex(
        (chip) => chip.position.x === x && chip.position.y === i,
      )
      const belowIndex = boardState.findIndex(
        (chip) => chip.position.x === x && chip.position.y === i + 1,
      )

      if (boardState[belowIndex]?.value !== null || i === BOTTOM_BORDER) {
        return index
      }
    }
    return -1
  }

  const onChipClick = useCallback(
    ({ position, value }: Chip) => {
      if (isGameFinished || value !== null) return

      setBoard((prevBoard) => {
        const index = findAvailableRowIndex(prevBoard, position.x)

        if (index === -1) return prevBoard

        const newBoard = [...prevBoard]
        newBoard[index] = { ...newBoard[index], value: currentPlayer }

        const playerWon = checkForPlayerWin(newBoard)

        if (playerWon) {
          setIsGameFinished(true)
          setWhichPlayerWon(playerWon)
          setPlayersScore((prevScore) => ({
            ...prevScore,
            [playerWon === 'red' ? 'player1' : 'player2']:
              prevScore[playerWon === 'red' ? 'player1' : 'player2'] + 1,
          }))
        }

        setCurrentPlayer((prevPlayer: CurrentPlayer) =>
          prevPlayer === 'red' ? 'yellow' : 'red',
        )

        return newBoard
      })
    },
    [currentPlayer, isGameFinished],
  )

  return {
    board,
    onRestart,
    onChipClick,
    currentPlayer,
    isGameFinished,
    whichPlayerWon,
    playersScore,
  }
}

export default useGameBoard
