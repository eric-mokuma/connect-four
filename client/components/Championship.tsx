import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

interface Player {
  name: string
  matches: number
  points: number
  matchesPlayed: number
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function Championship() {
  const [players, setPlayers] = useState<Player[]>([])
  const [currentMatch, setCurrentMatch] = useState<[string, string] | null>(
    null,
  )
  const [isCompetitionStarted, setIsCompetitionStarted] =
    useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedPlayers = localStorage.getItem('championshipPlayers')
    if (storedPlayers) {
      const playerList = JSON.parse(storedPlayers)
      const shuffledPlayers = shuffleArray(playerList)
      const initializedPlayers = shuffledPlayers.map((player) => ({
        name: player,
        matches: 6,
        points: 0,
        matchesPlayed: 0,
      }))
      setPlayers(initializedPlayers)
    }
  }, [])

  const startCompetition = () => {
    if (players.length > 0) {
      const groups: Player[][] = []
      for (let i = 0; i < players.length; i += 4) {
        groups.push(players.slice(i, i + 4))
      }

      localStorage.setItem('matchups', JSON.stringify(groups))
      setIsCompetitionStarted(true)
      startNextMatch(groups)
    }
  }

  const startNextMatch = (groups: Player[][]) => {
    const availableGroups = groups.filter((group) => group.length > 1) // Ensure there are players in the group
    if (availableGroups.length > 0) {
      const randomGroup =
        availableGroups[Math.floor(Math.random() * availableGroups.length)]
      const randomMatchup = shuffleArray(randomGroup).slice(0, 2)
      if (randomMatchup.length === 2) {
        setCurrentMatch([randomMatchup[0].name, randomMatchup[1].name])
      }
    }
  }

  const handleMatchComplete = (winner: string) => {
    if (!currentMatch) return

    const updatedPlayers = players.map((player) => {
      if (player.name === winner) {
        player.points += 3 // Winner gets 3 points
      }
      player.matchesPlayed += 1 // Increment matches played
      return player
    })

    setPlayers(updatedPlayers)
    setCurrentMatch(null) // Clear current match
    startNextMatch(JSON.parse(localStorage.getItem('matchups') || '[]')) // Start the next match
  }

  const handleEditPlayers = () => {
    navigate('/edit-players')
  }

  const groupNames = [
    'Group A',
    'Group B',
    'Group C',
    'Group D',
    'Group E',
    'Group F',
  ]

  const groups = groupNames.map((groupName, index) => ({
    groupName,
    players: players.slice(index * 4, index * 4 + 4),
  }))

  return (
    <div className="content-center mx-auto w-4/5 block rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
      <Header />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Championship Groups
      </h1>
      <div className="mb-4">
        <button
          onClick={startCompetition}
          className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={players.length < 2}
        >
          Start Competition
        </button>
        <button
          onClick={handleEditPlayers}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Edit Players
        </button>
      </div>
      {currentMatch && (
        <div>
          <h2>
            Current Match: {currentMatch[0]} vs {currentMatch[1]}
          </h2>
          <button
            onClick={() => handleMatchComplete(currentMatch[0])}
            className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {currentMatch[0]} Wins
          </button>
          <button
            onClick={() => handleMatchComplete(currentMatch[1])}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {currentMatch[1]} Wins
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-6xl">
        {groups.map((group) => (
          <div key={group.groupName} className="overflow-hidden mb-1">
            <h2 className="text-lg font-semibold text-white mb-1">
              {group.groupName}
            </h2>
            <ul className="p-2 divide-y divide-slate-200">
              {group.players.length > 0 ? (
                group.players.map((player) => (
                  <li
                    key={player.name}
                    className="text-sm font-medium text-slate-900 flex justify-between items-center"
                  >
                    <span>{player.name}</span>
                    <span>
                      Points: {player.points} | Matches: {player.matchesPlayed}/
                      {player.matches}
                    </span>
                  </li>
                ))
              ) : (
                <li className="bg-white border border-gray-300 p-2 rounded-md">
                  No players in this group
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
