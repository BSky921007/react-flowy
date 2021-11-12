import React, { useCallback, useState } from 'react';
import './App.css';
import './flowy.css';
import Header from './components/Header';
import LeftTab from './components/LeftTab';
import Canvas from './components/Canvas';
import PropWrap from './components/PropWrap';
import { BranchProps, FilterProps, CardData, SelectTypes } from './types';
import { arrayToString } from './Globals';

export const App = () => {
  const [isOpenProp, setIsOpenProp] = useState(false);
  const [rightCards, setRightCards] = useState<CardData[]>([]);
  const [index, setIndex] = useState(0);

  const getElements = useCallback((elementId: number, elements: CardData[]): number[] => {
    const tempCard = elements.find(({id}) => id === elementId);
    const childrenIds = tempCard?.children;
    if (!childrenIds || childrenIds?.length === 0) {
        return [elementId];
    }
    let result: number[] = [];
    for (let i = 0; i < childrenIds!.length ; i++) {
        const child = childrenIds[i];
        const childElements = getElements(child, elements);
        if (result.find((temp) => temp === elementId)) result = [...result, ...childElements];
        else result = [...result, elementId, ...childElements];
    }
    if (result.length > 0) return result;
    else return [];
}, []);
  
  const onViewProps = (propCards: CardData[], id: number) => {
    let flag = false;
    // console.log(propCards, id);
    setRightCards(propCards);
    for (var i = 0; i < propCards.length; i ++) {
      if (propCards[i].isOpenProps === true) {
        flag = true;
        setIndex(i);
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
      const id = newCards[index].id;
      const tempSelectedIds = getElements(id, newCards);
      const tempSelCard = newCards.find((newCard) => newCard.id === id);
      if (tempSelCard) {
        const tempParentCard = newCards.find((newCard) => newCard.id === tempSelCard.parentId);
        if(tempParentCard) {
          tempParentCard.children = tempParentCard.children.filter((b) => b !== id);
          tempParentCard.childrenCnt --;
        }
        setRightCards(newCards.filter((newCard) => !tempSelectedIds.includes(newCard.id)));
      }
    } else {
      return;
    }
  }

  const saveCard = (action: SelectTypes[], input: string) => {
    // console.log(rightCards, index, action);
    if (index > -1) {
      const newCards = [...rightCards];
      // console.log(newCards);
      const selectedCard = newCards[index];
      console.log(selectedCard);
      if (selectedCard.name === 'Custom') {
        selectedCard.template = input;
        selectedCard.selectedOptions = action;
      } else {
        selectedCard.template = arrayToString(action);
        selectedCard.selectedOptions = action;
      }
      setRightCards(newCards);
    }
  }

  const saveBranch = (action: BranchProps[]) => {
    if (index > -1) {
      const newCards = [...rightCards];
      const selectedCard = newCards[index];
      selectedCard.selectedBranches = action;
      setRightCards(newCards);
    }
  }

  const saveFilter = (action: FilterProps[]) => {
    if (index > -1) {
      const newCards = [...rightCards];
      const selectedCard = newCards[index];
      selectedCard.selectedFilters = action;
      setRightCards(newCards);
    }
  }

  return (
    <div className="App">
      <Header />
      <LeftTab />
      <PropWrap 
        data={isOpenProp} 
        propData={rightCards[index]} 
        onDelete={deleteCard} 
        onSave={saveCard} 
        onSaveBranch={saveBranch} 
        onSaveFilter={saveFilter}
      />
      <Canvas 
        isOpenProp={isOpenProp} 
        onPropsView={onViewProps} 
        data={rightCards} 
      />
    </div>
  );
}

export default App;
