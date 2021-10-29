import React from 'react';
import './App.css';
import './flowy.css';
import Header from './components/Header';
import LeftTab from './components/LeftTab';
import Canvas from './components/Canvas';

export const App = () => {

  return (
    <div className="App">
      <Header />
      <LeftTab />
      <Canvas />
    </div>
  );
}

export default App;
