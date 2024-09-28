import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

export default function Home() {
  const [playerNames, setPlayerNames] = useState(Array(24).fill(''))
  const [isChampionship, setIsChampionship] = useState(false)
  const navigate = useNavigate()

  const handlePlayerNameChange = (index: number, value: string) => {
    const newNames = [...playerNames]
    newNames[index] = value
    setPlayerNames(newNames)
  }

  const handleStartGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (playerNames[0].trim() && playerNames[1].trim()) {
      localStorage.setItem('player1Name', playerNames[0])
      localStorage.setItem('player2Name', playerNames[1])
      navigate('/game')
    } else {
      alert('Please enter names for both players.')
    }
  }

  const handleStartChampionship = () => {
    const names = playerNames.filter((name) => name.trim())
    if (names.length >= 2 && names.length <= 24) {
      localStorage.setItem('championshipPlayers', JSON.stringify(names))
      navigate('/championship')
    } else {
      alert('Please enter names for at least 2 and up to 24 players.')
    }
  }

  return (
    <div className="content-center mx-auto w-4/5 block rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
      <Header /> {/* Use the Header component */}
      <div className="home-container">
        <p className="text-justify">
          Welcome to Connect Four! Players take turns dropping colored discs
          into a grid. The first player to connect four of their discs
          vertically, horizontally, or diagonally wins!
        </p>
        <button
          className="restart-button"
          onClick={() => setIsChampionship(!isChampionship)}
        >
          {isChampionship
            ? 'Switch to 2 Player Game'
            : 'Switch to Championship'}
        </button>

        <h2 className="home-subtitle">
          {isChampionship
            ? 'Enter Player Names (up to 24)'
            : 'Enter Player Names (2)'}
        </h2>
        <form
          onSubmit={isChampionship ? handleStartChampionship : handleStartGame}
          className="home-form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isChampionship ? (
              Array.from({ length: 24 }, (_, index) => (
                <div key={index}>
                  <label htmlFor={`player-${index}`} className="sr-only">
                    Player {index + 1}
                  </label>
                  <input
                    id={`player-${index}`}
                    type="text"
                    className="border-solid border-2 border-sky-500 rounded-md justify-stretch space-x-4 m-1 w-full"
                    placeholder={`Player ${index + 1}`}
                    value={playerNames[index]}
                    onChange={(e) =>
                      handlePlayerNameChange(index, e.target.value)
                    }
                  />
                </div>
              ))
            ) : (
              <>
                <div>
                  <label htmlFor="player-1" className="sr-only">
                    Player 1
                  </label>
                  <input
                    id="player-1"
                    type="text"
                    className="border-solid border-2 border-sky-500 rounded-md justify-stretch space-x-4 m-1 w-full"
                    placeholder="Player 1"
                    value={playerNames[0]}
                    onChange={(e) => handlePlayerNameChange(0, e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="player-2" className="sr-only">
                    Player 2
                  </label>
                  <input
                    id="player-2"
                    type="text"
                    className="border-solid border-2 border-sky-500 rounded-md justify-stretch space-x-4 m-1 w-full"
                    placeholder="Player 2"
                    value={playerNames[1]}
                    onChange={(e) => handlePlayerNameChange(1, e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <button type="submit" className="home-button">
            {isChampionship ? 'START CHAMPIONSHIP' : 'VALID VS'}
          </button>
        </form>
        <div className="footer">
          <button
            onClick={() => navigate('/')}
            className="mr-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
