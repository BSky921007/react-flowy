import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Builder from './Builder'
import PathwayWrapper from './PathwayWrapper'
import Bundle from './Bundle'
import Manager from './Manager'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Manager params={{patientId: 'rec23rwd23232'}}/>} />
        <Route path="/builder/:protocolId" element={<Builder />}></Route>
        <Route path="/bundles/:bundleId/protocols/:protocolId" element={<Bundle />} />
        <Route path="/bundles/:bundleId" element={<Bundle />} />
        <Route path="/pathways/:pathwayId" element={<PathwayWrapper />} />
        <Route path="/manager/:patientId" element={<Manager />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)