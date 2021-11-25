import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import PathwayWrapper from './PathwayWrapper'
import Protocol from './Protocol'
import Manager from './Manager'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/protocols/:protocolId" element={<Protocol />} />
        <Route path="/pathways/:pathwayId" element={<PathwayWrapper />} />
        <Route path="/manager/:patientId" element={<Manager />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
