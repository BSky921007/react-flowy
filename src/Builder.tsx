import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './builder.css';
import './flowy.css';
import Header from './components/Header';
import LeftTab from './components/LeftTab';
import Canvas from './components/Canvas';
import PropWrap from './components/PropWrap';
import { BranchProps, FilterProps, CardData, SelectTypes, BranchTypes, GlobalData, BundleType, ProtocolType, BlockData } from './types';
import { arrayToString } from './Globals';
import BareLayout from './BareLayout'

const token = 'keymneuuZO7FHj0i3';
const options = {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
};

export const Builder = () => {
  const { protocolId } = useParams();
  const [isOpenProp, setIsOpenProp] = useState(false);
  const [isOpenGlobal, setIsOpenGlobal] = useState(false);
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const [bundles, setBundles] = useState<BundleType[]>([]);
  const [protocols, setProtocols] = useState<ProtocolType[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<BundleType>();
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType>();
  const [selectableProtocols, setSelectableProtocols] = useState<ProtocolType[]>([]);

  const [rightCards, setRightCards] = useState<CardData[]>([]);
  const [blocks, setBlocks] = useState<BlockData[]>([]);
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

  const saveBlock = async(block: any) => {
    const data = {
      records: [{ fields: block }]
    };

    await axios.post('https://api.airtable.com/v0/appJ6LHBEjhaorG0k/Blocks', data, options)
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
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
    if (flag) {
      setIsOpenGlobal(!flag);
      setIsOpenHeader(!flag);
    }
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

  const viewGlobal = () => {
    const newCards = [...rightCards];
    for (let i = 0; i < newCards.length; i ++) {
      newCards[i].isOpenProps = false;
    }
    setRightCards(newCards);
    if (!isOpenGlobal) {
      setIsOpenProp(false);
      setIsOpenHeader(false);
    }
    setIsOpenGlobal(!isOpenGlobal);
  } 

  const viewHeader = () => {
    console.log(isOpenHeader);
    const newCards = [...rightCards];
    for (let i = 0; i < newCards.length; i ++) {
      newCards[i].isOpenProps = false;
    }
    setRightCards(newCards);
    if (!isOpenHeader) {
      setIsOpenProp(false);
      setIsOpenGlobal(false);
    }
    setIsOpenHeader(!isOpenHeader);
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
      const temp = tempProtocols.find(({ id }) => id === res.data.records[0].id);
      if (temp) {
        temp.createdTime = res.data.records[0].createdTime;
        temp.id = res.data.records[0].id;
        temp.fields = res.data.records[0].fields;
        temp.fields.id = res.data.records[0].id;
        console.log(temp);
        setSelectedProtocol(temp);
      }
      setProtocols(tempProtocols);
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

  const patchBundle = async(tempBundle: BundleType) => {
    const data = {
      records: [
        {
          fields: {
            name: tempBundle.fields.name, 
            protocols: tempBundle.fields.protocols
          }, 
          id: tempBundle.id
        }
      ]
    };

    await axios.patch('https://api.airtable.com/v0/appJ6LHBEjhaorG0k/Bundles', data, options)
    .then((res: any) => {
      const tempBundles = [...bundles];
      const temp = tempBundles.find(({ id }) => id === res.data.records[0].id);
      if (temp) {
        temp.createdTime = res.data.records[0].createdTime;
        temp.id = res.data.records[0].id;
        temp.fields = res.data.records[0].fields;
        console.log(temp);
        setSelectedBundle(temp);
      }
      setBundles(tempBundles);
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

  const globalSave = (tempBundle: BundleType, tempProtocol: ProtocolType, isChange: boolean) => {
    if (isChange) {
      patchProtocol(tempProtocol);
      patchBundle(tempBundle);
    } else {
      setSelectedBundle(tempBundle);
      setSelectedProtocol(tempProtocol);
    }
  }

  const headerOpen = (tempBundle: BundleType, tempProtocol: ProtocolType) => {
    setSelectedBundle(tempBundle);
    setSelectedProtocol(tempProtocol);
  }

  const closeProperties = () => {
    setIsOpenHeader(false);
    setIsOpenGlobal(false);
    setIsOpenProp(false);
  }

  useEffect(() => {
    getBundles();
    getProtocols();
  }, []);

  useEffect(() => {
    const tempProtocol = protocols.find(({ id }) => id === protocolId);
    if (tempProtocol) {
      setSelectedProtocol(tempProtocol);

      if (selectedBundle) return;

      const tempBundle = bundles.find(({ id }) => id === tempProtocol.fields.bundles[0]);
      if (tempBundle) {
        setSelectedBundle(tempBundle);
      }
    }
  }, [protocols, bundles, protocolId, selectedBundle]);

  useEffect(() => {
    if (selectedBundle && protocols.length > 0) {
      const tempProtocols: ProtocolType[] = [];
      for (let i = 0; i < protocols.length; i ++) {
        if (protocols[i].fields.bundles.includes(selectedBundle.id)) {
          tempProtocols.push(protocols[i]);
        }
      }
      setSelectableProtocols(tempProtocols); 
    }
  }, [selectedBundle, protocols]);

  return (
    <div className="App">
      <BareLayout>
      <Header 
        isOpenHeader={isOpenHeader}
        data={rightCards} 
        bundles={bundles}
        protocols={protocols}
        selBundle={selectedBundle}
        selProtocol={selectedProtocol}
        onLoad={loadFromJson} 
        onViewGlobal={viewGlobal}
        onViewHeader={viewHeader}
      />
      <LeftTab />
      <PropWrap 
        data={isOpenProp} 
        isGlobal={isOpenGlobal}
        isHeader={isOpenHeader}
        bundles={bundles}
        protocols={protocols}
        selBundle={selectedBundle}
        selProtocol={selectedProtocol}
        selableProtocols={selectableProtocols}
        propData={rightCards[index]} 
        onDelete={deleteCard} 
        onSave={saveCard} 
        onSaveBranch={saveBranch} 
        onSaveFilter={saveFilter}
        onSaveFilterName={saveFilterName}
        onSaveBranchPoint={saveBranchPoint}
        onGlobalSave={globalSave}
        onHeaderOpen={headerOpen}
        onCloseProperties={closeProperties}
      />
      <Canvas 
        isOpenProp={isOpenProp} 
        data={rightCards} 
        block={blocks}
        selBundle={selectedBundle}
        selProtocol={selectedProtocol}
        onPropsView={onViewProps} 
        onCanvasDrop={canvasDrop}
        onSaveBlock={saveBlock}
        onDeleteCard={deleteCardFromCanvas}
      />
      </BareLayout>
    </div>
  );
}

export default Builder;
