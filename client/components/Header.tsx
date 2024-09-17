import React from 'react'
import Button from './Btn'

interface HeaderProps {
  onRestart: () => void
}

const Header: React.FC<HeaderProps> = ({ onRestart }) => {
  return (
    <div className="header-wrapper">
      <h2 className="header-title">Connect four in React</h2>
      <Button onClick={onRestart}>Restart</Button>
    </div>
  )
}

export default Header
