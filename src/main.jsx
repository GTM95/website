import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Environment variable validation
const requiredEnv = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missingEnv = requiredEnv.filter(key => !import.meta.env[key]);

if (missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
  document.body.innerHTML = `<div style="padding: 2rem; color: #ef4444; font-family: sans-serif;">
        <h1>Startup Error</h1>
        <p>Missing required environment variables. Please check your .env file.</p>
    </div>`;
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
