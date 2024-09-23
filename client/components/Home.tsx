import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const navigate = useNavigate()

  const handleStartGame = (e) => {
    e.preventDefault()
    if (player1Name && player2Name) {
      localStorage.setItem('player1Name', player1Name)
      localStorage.setItem('player2Name', player2Name)
      navigate('/game')
    }
  }

  return (
    <div className="mx-auto block max-w-sm rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
      <h1 className="text-center mb-4">Please enter your Names</h1>
      <form onSubmit={handleStartGame}>
        <div className="relative mb-6">
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300"
            placeholder="Player 1 Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <label className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary">
            Player 1 Name
          </label>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300"
            placeholder="Player 2 Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
          <label className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary">
            Player 2 Name
          </label>
        </div>

        <button
          type="submit"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300 focus:outline-none"
        >
          Start Game
        </button>
      </form>
    </div>
  )
}
