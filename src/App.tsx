import React, { useCallback, useState } from 'react';
import './App.css';
import './flowy.css';
import Header from './components/Header';
import LeftTab from './components/LeftTab';
import Canvas from './components/Canvas';
import PropWrap from './components/PropWrap';
import { CardData } from './types';

export const App = () => {
  const [isOpenProp, setIsOpenProp] = useState(false);
  const [rightCards, setRightCards] = useState<CardData[]>([]);

  const onViewProps = (rightCards: CardData[], id: number) => {
    setRightCards(rightCards);
    setIsOpenProp(true);
  }

  const onViewProp = () => {
    setIsOpenProp(false);
  }

  return (
    <div className="App">
      <Header />
      <LeftTab />
      <PropWrap data={isOpenProp} onClick={onViewProp}/>
      <Canvas data={rightCards} onPropsView={onViewProps}/>
    </div>
  );
}

export default App;
