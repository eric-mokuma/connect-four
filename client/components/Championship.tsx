import React, { useEffect, useState } from 'react'

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const Championship: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([])

  useEffect(() => {
    const storedPlayers = localStorage.getItem('championshipPlayers')
    if (storedPlayers) {
      const playerList = JSON.parse(storedPlayers)

      const shuffledPlayers = shuffleArray(playerList)
      setPlayers(shuffledPlayers)
    }
  }, [])

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
    <div className="championship-container">
      <h1>Championship Groups</h1>
      <div className="groups-grid">
        {groups.map((group) => (
          <div key={group.groupName} className="group">
            <h2>{group.groupName}</h2>
            <ul>
              {group.players.length > 0 ? (
                group.players.map((player) => <li key={player}>{player}</li>)
              ) : (
                <li>No players in this group</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Championship
