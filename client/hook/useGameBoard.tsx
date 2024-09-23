import { useState } from 'react'
import { generateBoard, checkForPlayerWin } from '../utils/gameUtils'
import { Chip, CurrentPlayer } from './types'

// Define possible player keys
type PlayerKey = 'red' | 'yellow'

// Custom hook for managing game board state
export default function useGameBoard() {
  // State to hold the game board (2D array of Chips)
  const [board, setBoard] = useState<Chip[][]>(generateBoard())
  // State to track the current player
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('red')
  // State to indicate if the game has finished
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  // State to store the winner of the game, if any
  const [winner, setWinner] = useState<CurrentPlayer | null>(null)
  // State to keep track of scores for each player
  const [scores, setScores] = useState<{ red: number; yellow: number }>({
    red: 0,
    yellow: 0,
  })

  // Function to handle the click on a chip
  const handleChipClick = (colIndex: number) => {
    // Prevent any actions if the game is finished
    if (isGameFinished) return

    // Create a copy of the current board to update
    const newBoard = [...board]
    // Loop from the bottom of the column to find the first empty row
    for (let row = newBoard.length - 1; row >= 0; row--) {
      // Check if the cell is empty
      if (!newBoard[row][colIndex].value) {
        // Place the current player's chip in the cell
        newBoard[row][colIndex].value = currentPlayer
        break // Exit the loop once a chip is placed
      }
    }

    // Check if this move results in a win for the current player
    const winningPlayer = checkForPlayerWin(newBoard)
    if (winningPlayer) {
      // If there's a winner, update the game state
      setIsGameFinished(true)
      setWinner(winningPlayer)

      // Determine the key for the winning player
      const playerKey: PlayerKey = winningPlayer.toLowerCase() as PlayerKey

      // Update the scores for the winning player
      setScores((prevScores) => ({
        ...prevScores,
        [playerKey]: prevScores[playerKey] + 1,
      }))

      // Restart the game after a short delay
      setTimeout(() => restartGame(), 3000)
    } else {
      // If no winner, switch to the other player
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red')
    }

    // Update the board state with the new board configuration
    setBoard(newBoard)
  }

  // Function to restart the game
  const restartGame = () => {
    // Reset the board and game states
    setBoard(generateBoard())
    setCurrentPlayer('red') // Start with red player
    setIsGameFinished(false) // Game is not finished
    setWinner(null) // No winner at the start
  }

  // Return the current state and functions to the component using this hook
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
