import { createRoot } from 'react-dom/client'
import Router from './Router'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('app') as HTMLElement
  const root = createRoot(rootElement)
  root.render(<Router />)
})
