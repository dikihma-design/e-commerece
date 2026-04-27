import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './template.css'
import './assets/font-awesome/css/all.min.css'
import {Provider} from 'react-redux'
import App from './App.jsx'
// import Reducer from './Reducer.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
