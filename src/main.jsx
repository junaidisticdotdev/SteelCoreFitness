import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Ye line add ki
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* App ko BrowserRouter ke andar wrap kar diya */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)