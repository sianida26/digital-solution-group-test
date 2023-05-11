import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Notifications } from '@mantine/notifications';
import './styles/tailwind.css'
import './styles/fonts.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Notifications />
    <App />
  </React.StrictMode>,
)
