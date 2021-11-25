import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './flowy.css';
import Header from './components/Header';
import LeftTab from './components/LeftTab';
import Canvas from './components/Canvas';
import PropWrap from './components/PropWrap';
import GlobalWrap from './components/GlobalWrap';
import { BranchProps, FilterProps, CardData, SelectTypes, BranchTypes, GlobalData, BundleType, ProtocolType } from './types';
import { arrayToString } from './Globals';

const token = 'keymneuuZO7FHj0i3';
const options = {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
};

export const App = () => {
  const [isOpenProp, setIsOpenProp] = useState(false);
  const [isOpenGlobal, setIsOpenGlobal] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [bundles, setBundles] = useState<BundleType[]>([]);
  const [protocols, setProtocols] = useState<ProtocolType[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<BundleType>();
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType>();

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

  const canvasDrop = (cards: CardData[]) => {
    setRightCards(cards);
  }
  
  const onViewProps = (propCards: CardData[], id: number) => {
    let flag = false;
    setRightCards(propCards);
    for (var i = 0; i < propCards.length; i ++) {
      if (propCards[i].isOpenProps === true) {
        flag = true;
        setIndex(i);
        break;
      }
    } 
    setIsOpenProp(flag);
    if (flag) setIsOpenGlobal(!flag);
  }

  const deleteCardFromCanvas = (action: CardData[]) => {
    if (action) {
      setRightCards(action);
    }
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
    if (index > -1) {
      const newCards = [...rightCards];
      const selectedCard = newCards[index];
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
      console.log(newCards);
      const selectedCard = newCards[index];
      selectedCard.selectedBranches = action;
      setRightCards(newCards);
    }
  }

  const saveFilter = (action: FilterProps[]) => {
    if (index > -1) {
      console.log(action);
      const newCards = [...rightCards];
      const selectedCard = newCards[index];
      selectedCard.selectedFilters = action;
      selectedCard.template = '';
      for (let i = 0; i < action.length; i ++) {
        selectedCard.template += `${action[i].data.condition[0].name} ${action[i].data.name[0].name} ${action[i].data.filter[0].name} ${action[i].data.value} `;
        selectedCard.template = selectedCard.template.replace("...", "");
      }
      setRightCards(newCards);
    }
  }

  const saveFilterName = (action: any) => {
  }

  const saveBranchPoint = (action: BranchTypes[]) => {
    if (action.length > 0) {
      const newCards = [...rightCards];
      const selectedCard = newCards[index];
      selectedCard.selectedBranchPoint = action;
      selectedCard.begin = 'Branch on ';
      selectedCard.template = action[0].name;
      console.log(newCards);
      setRightCards(newCards);
    }
  }

  const loadFromJson = (action: GlobalData) => {
    if (action) {
      setRightCards(action.blocks);
      setSelectedBundle(action.properties.bundle);
      setSelectedProtocol(action.properties.protocol);
    }
  }

  const viewGlobal = (tempTitle: string, tempSubTitle: string) => {
    const newCards = [...rightCards];
    for (let i = 0; i < newCards.length; i ++) {
      newCards[i].isOpenProps = false;
    }
    setRightCards(newCards);
    if (!isOpenGlobal) setIsOpenProp(false);
    setIsOpenGlobal(!isOpenGlobal);
    setTitle(tempTitle);
    setSubTitle(tempSubTitle);
  } 

  const getBundles = async() => {
    await axios.get('https://api.airtable.com/v0/appJ6LHBEjhaorG0k/Bundles?maxRecords=3&view=Grid%20view', options)
    .then((res: any) => {
      setBundles(res.data.records);
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

  const getProtocols = async() => {
    await axios.get('https://api.airtable.com/v0/appJ6LHBEjhaorG0k/Protocols?maxRecords=3&view=Grid%20view', options)
    .then((res: any) => {
      setProtocols(res.data.records);
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

  const patchProtocol = async(tempProtocol: ProtocolType) => {
    const data = {
      records: [
        {
          fields: {
            name: tempProtocol.fields.name, 
            bundles: tempProtocol.fields.bundles
          }, 
          id: tempProtocol.id
        }
      ]
    };

    await axios.patch('https://api.airtable.com/v0/appJ6LHBEjhaorG0k/Protocols', data, options)
    .then((res: any) => {
      const tempProtocols = [...protocols];
      const temp = tempProtocols.find(({ id }) => id === tempProtocol.id);
      if (temp) {
        temp.createdTime = res.data.records[0].createdTime;
        temp.id = res.data.records[0].id;
        temp.fields = res.data.records[0].fields;
      }
      setProtocols(tempProtocols);
    })
    .catch((err: any) => {
      console.log(err);
    });
  }
  const globalSave = (tempBundle: BundleType, tempProtocol: ProtocolType) => {
    patchProtocol(tempProtocol);
    setSelectedBundle(tempBundle);
    setSelectedProtocol(tempProtocol);
  }

  useEffect(() => {
    getBundles();
    getProtocols();
  }, []);

  return (
    <div className="App">
      <Header 
        data={rightCards} 
        bundles={bundles}
        protocols={protocols}
        selBundle={selectedBundle}
        selProtocol={selectedProtocol}
        onLoad={loadFromJson} 
        onViewGlobal={viewGlobal}
      />
      <LeftTab />
      <PropWrap 
        data={isOpenProp} 
        isGlobal={isOpenGlobal}
        bundles={bundles}
        protocols={protocols}
        selBundle={selectedBundle}
        selProtocol={selectedProtocol}
        propData={rightCards[index]} 
        onDelete={deleteCard} 
        onSave={saveCard} 
        onSaveBranch={saveBranch} 
        onSaveFilter={saveFilter}
        onSaveFilterName={saveFilterName}
        onSaveBranchPoint={saveBranchPoint}
        onGlobalSave={globalSave}
      />
      <Canvas 
        isOpenProp={isOpenProp} 
        onPropsView={onViewProps} 
        onCanvasDrop={canvasDrop}
        data={rightCards} 
        onDeleteCard={deleteCardFromCanvas}
      />
    </div>
  );
}

export default App;
