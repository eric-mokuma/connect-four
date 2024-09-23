import Button from './Button'
import styles from './Board.module.css'

interface HeaderProps {
  onRestart: () => void
  onLeaveMatch: () => void
}

export default function Header({ onRestart, onLeaveMatch }: HeaderProps) {
  return (
    <div className={styles.headerWrapper}>
      <h1 className={styles.headerTitle}>CONNECT FOUR</h1>
      <Button onClick={onRestart}>Restart</Button>
      <Button onClick={onLeaveMatch}>Leave Match</Button>
    </div>
  )
}
