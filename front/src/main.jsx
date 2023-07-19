import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Calculadora from './Calculadora.jsx'

// Se define el componente principal de la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Calculadora />
  </React.StrictMode>,
)
