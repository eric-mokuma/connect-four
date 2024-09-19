import React from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('app') as HTMLElement
  const root = createRoot(rootElement)
  root.render(<Router />)
})
