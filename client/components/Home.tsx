import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [playerNames, setPlayerNames] = useState(['', ''])
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
    <div className="mx-auto w-4/5 block rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
      <div className="home-container">
        <h1 className="home-title">Connect Four</h1>
        <p className="home-paragraph">
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
          <div className="input-group">
            {isChampionship ? (
              Array.from({ length: 24 }, (_, index) => (
                <input
                  key={index}
                  type="text"
                  className="home-input"
                  placeholder={`Player ${index + 1}`}
                  value={playerNames[index] || ''}
                  onChange={(e) =>
                    handlePlayerNameChange(index, e.target.value)
                  }
                />
              ))
            ) : (
              <>
                <input
                  type="text"
                  className="home-input"
                  placeholder="Player 1"
                  value={playerNames[0]}
                  onChange={(e) => handlePlayerNameChange(0, e.target.value)}
                />
                <input
                  type="text"
                  className="home-input"
                  placeholder="Player 2"
                  value={playerNames[1]}
                  onChange={(e) => handlePlayerNameChange(1, e.target.value)}
                />
              </>
            )}
          </div>
          <button type="submit" className="home-button">
            {isChampionship ? 'START CHAMPIONSHIP' : 'VALID VS'}
          </button>
        </form>
        <div className="footer">©eric m. 2024</div>
      </div>
    </div>
  )
}
