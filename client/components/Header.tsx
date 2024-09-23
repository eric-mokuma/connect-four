import Button from './Button'
import styles from './Board.module.css'

// Define the props expected by the Header component
interface HeaderProps {
  onRestart: () => void // Function to be called when the Restart button is clicked
  onLeaveMatch: () => void // Function to be called when the Leave Match button is clicked
}

// Define and export the Header functional component
export default function Header({ onRestart, onLeaveMatch }: HeaderProps) {
  return (
    // Main wrapper for the header section, using styles from the imported CSS module
    <div className={styles.headerWrapper}>
      {/* Title of the game */}
      <h1 className={styles.headerTitle}>CONNECT FOUR</h1>
      {/* Button to restart the game, triggers the onRestart function when clicked */}
      <Button onClick={onRestart}>Restart</Button>
      {/* Button to leave the match, triggers the onLeaveMatch function when clicked */}
      <Button onClick={onLeaveMatch}>Leave Match</Button>
    </div>
  )
}
