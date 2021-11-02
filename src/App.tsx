import React, { useCallback, useState } from 'react';
import './App.css';
import './flowy.css';
import Header from './components/Header';
import LeftTab from './components/LeftTab';
import Canvas from './components/Canvas';
import PropWrap from './components/PropWrap';
import { ArrowData, CardData } from './types';

export const App = () => {
  const [isOpenProp, setIsOpenProp] = useState(false);
  const [rightCards, setRightCards] = useState<CardData[]>([]);
  const [index, setIndex] = useState(0);
  
  const onViewProps = (propCards: CardData[], id: number) => {
    let flag = false;
    console.log(propCards, id);
    setRightCards(propCards);
    for (var i = 0; i < propCards.length; i ++) {
      if (propCards[i].isOpenProps === true) {
        flag = true;
        setIndex(i);
        console.log(i);
        break;
      }
    } 
    setIsOpenProp(flag);
  }

  const deleteCard = () => {
    console.log(rightCards, index);
    if (index === 0) {
      const emptyCards: CardData[] = [];
      setRightCards(emptyCards);
    } else if (index > 0) {
      const newCards = [...rightCards];
      console.log(newCards);
      const selectedCard = newCards[index];
      console.log(selectedCard);
      const parentCard = newCards.find((newCard) => newCard.id === selectedCard.parentId);
      if (parentCard) {
        parentCard.children = parentCard.children.filter((b) => b !== selectedCard.id);
      }
      newCards.splice(index, 1);
      console.log(parentCard);
      console.log(newCards);
      setRightCards(newCards);
    } else {
      return;
    }
  }

  const saveCard = (customAction: string) => {
    console.log(rightCards, index, customAction);
    if (index > 0) {
      const newCards = [...rightCards];
      console.log(newCards);
      const selectedCard = newCards[index];
      selectedCard.desc2 = customAction;
      console.log(selectedCard);
      console.log(newCards);
      setRightCards(newCards);
    }
  }

  return (
    <div className="App">
      <Header />
      <LeftTab />
      <PropWrap data={isOpenProp} propData={rightCards[index]} onDelete={deleteCard} onSave={saveCard} />
      <Canvas isOpenProp={isOpenProp} onPropsView={onViewProps} data={rightCards} />
    </div>
  );
}

export default App;
