import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Championship from './components/Championship'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Layout />} />
        <Route path="/championship" element={<Championship />} />{' '}
      </Routes>
    </Router>
  )
}
