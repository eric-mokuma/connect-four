import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Board.module.css'

// Define the Home component
export default function Home() {
  // State to hold the names of the players
  const [player1Name, setPlayer1Name] = useState('') // Player 1's name
  const [player2Name, setPlayer2Name] = useState('') // Player 2's name
  const navigate = useNavigate() // Initialize the navigate function for routing

  // Function to handle the start game event
  const handleStartGame = (e) => {
    e.preventDefault() // Prevent default form submission behavior
    // Check if both player names are provided
    if (player1Name.trim() && player2Name.trim()) {
      // Store player names in local storage for later use
      localStorage.setItem('player1Name', player1Name)
      localStorage.setItem('player2Name', player2Name)
      // Navigate to the game page
      navigate('/game')
    } else {
      // Alert the user to enter names for both players
      alert('Please enter names for both players.')
    }
  }

  // Render the component
  return (
    <div className="home-container">
      {' '}
      {/* Main container for the Home component */}
      <h1 className="home-title">Connect Four</h1> {/* Title of the game */}
      <p className="home-paragraph">
        Welcome to Connect Four! Players take turns dropping colored discs into
        a grid. The first player to connect four of their discs vertically,
        horizontally, or diagonally wins!
      </p>
      <h2 className="home-subtitle">Please enter your Names</h2>{' '}
      {/* Subtitle for input section */}
      <form onSubmit={handleStartGame} className="home-form">
        {' '}
        {/* Form for player name input */}
        <div className="input-container">
          {' '}
          {/* Container for Player 1's input */}
          <input
            type="text" // Input field for text
            className="home-input" // CSS class for styling
            placeholder="Enter your name" // Placeholder text for guidance
            value={player1Name} // Bind input value to state
            onChange={(e) => setPlayer1Name(e.target.value)} // Update state on input change
          />
        </div>
        <div className="input-container">
          {' '}
          {/* Container for Player 2's input */}
          <input
            type="text" // Input field for text
            className="home-input" // CSS class for styling
            placeholder="Enter your name" // Placeholder text for guidance
            value={player2Name} // Bind input value to state
            onChange={(e) => setPlayer2Name(e.target.value)} // Update state on input change
          />
        </div>
        <button type="submit" className="home-button">
          {' '}
          {/* Button to submit the form */}
          VALID GAME
        </button>
      </form>
    </div>
  )
}
