import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EditPlayers() {
  const [playerNames, setPlayerNames] = useState<string[]>(Array(24).fill(''))
  const navigate = useNavigate()

  useEffect(() => {
    const storedPlayers = localStorage.getItem('championshipPlayers')
    if (storedPlayers) {
      const players = JSON.parse(storedPlayers)
      setPlayerNames(players.concat(Array(24 - players.length).fill('')))
    }
  }, [])

  const handlePlayerNameChange = (index: number, value: string) => {
    const newNames = [...playerNames]
    newNames[index] = value
    setPlayerNames(newNames)
  }

  const handleSave = () => {
    const validNames = playerNames.filter((name) => name.trim())
    if (validNames.length >= 2 && validNames.length <= 24) {
      localStorage.setItem('championshipPlayers', JSON.stringify(validNames))
      navigate('/championship')
    } else {
      alert('Please enter names for at least 2 and up to 24 players.')
    }
  }

  return (
    <div className="content-center mx-auto w-4/5 block rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Edit Player Names
      </h1>
      <p className="text-justify mb-4">
        Update the names of the players participating in the championship below:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 24 }, (_, index) => (
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
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handleSave} className="home-button">
          Save Player Names
        </button>
        <button onClick={() => navigate('/')} className="home-button">
          Back to Home
        </button>
      </div>
    </div>
  )
}
