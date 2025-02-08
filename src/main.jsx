import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <nav className='navbar'>
      <h3 className='nav__title'>Kubemesh Learning Kit 🕹️</h3>
    </nav>
    <App />
  </StrictMode>,
)
