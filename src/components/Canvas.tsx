import React, { DragEvent, MouseEvent, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import RightCard from './RightCard';
import Arrow from './Arrow';
import { Right_Card, cardWidth, paddingX, paddingLeft, paddingTop, cardHeight, options } from '../Globals';
import { ArrowData, CardData, Position, CanvasProps, BranchTypes, BlockData } from '../types';
import { update } from 'lodash';

const Canvas = (props: CanvasProps) => {
    const { selBundle, selProtocol } = props;
    const [hasFirstCard, setHasFirstCard] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [isRealMoving, setIsRealMoving] = useState(false);
    const [isCanvasClicking, setIsCanvasClicking] = useState(false);
    const [moveFirstChild, setMoveFirstChild] = useState(false);
    const [cnt, setCnt] = useState(0);
    const [parentId, setParentId] = useState(-1);
    const [parentSavedId, setParentSavedId] = useState('');
    const [selectedId, setSelectedId] = useState(-1);
    const [selectedSavedId, setSelectedSavedId] = useState('');
    const [updatedId, setUpdatedId] = useState(-1);
    const [updatedSavedId, setUpdatedSavedId] = useState('');
    const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
    const [rightCards, setRightCards] = useState<CardData[]>(props.cardsData);
    const [selectedBlocks, setSelectedBlocks] = useState<BlockData[]>([]);
    const [blocks, setBlocks] = useState<BlockData[]>(props.blocksData);
    const [arrows, setArrows] = useState<ArrowData[]>([]);
    const [selectedArrows, setSelectedArrows] = useState<ArrowData[]>([]);

    const formatParent = () => {
        setParentId(-1);
        setParentSavedId('');
    }  

    const formatCanvasState = () => {
        setParentId(-1);
        setParentSavedId('');
        setSelectedId(-1);
        setSelectedSavedId('');
        setUpdatedId(-1);
        setUpdatedSavedId('');
    }

    const drawArrows = useCallback((elements: CardData[]): ArrowData[] => {
        const newArrow: ArrowData[] = [];
        for (let i = 0; i < elements.length; i ++) {
            const tempParent = elements.find(({id}) => id === elements[i].parentId);
            const tempSelf = elements.find(({id}) => id === elements[i].id);
            let line, triangle;
            if (tempParent && tempSelf) {
                line = `M${tempParent!.position.x+159} ${tempParent!.position.y+122} L${tempParent!.position.x+159} ${tempParent!.position.y+162} L${tempSelf!.position.x+159} ${tempParent!.position.y+162} L${tempSelf!.position.x+159} ${tempParent!.position.y+202}`;
                triangle = `M${tempSelf!.position.x+159} ${tempParent!.position.y+200} L${tempSelf!.position.x+154} ${tempParent!.position.y+196} L${tempSelf!.position.x+164} ${tempParent!.position.y+196} Z`;
            } else {
                line = '';
                triangle = '';
            }
            newArrow.push({
                id: i, 
                parentId: elements[i].parentId, 
                selfId: i, 
                line: line, 
                triangle: triangle
            });
        }
        return newArrow;
    }, []);

    const getElementWidth = useCallback((elementId: number, elements: CardData[]): number => {
        const tempCard = elements.find(({id}) => id === elementId);
        if (!tempCard) return 0;
        const childrenIds = tempCard.childrenIds;
        if (!childrenIds || childrenIds.length === 0) return 1;
        let childWidth = 0;

        for (let i = 0; i < childrenIds.length ; i++) {
            const child = childrenIds[i];
            childWidth += getElementWidth(child, elements);
        }
        if (childWidth > 0) return childWidth;
        else return 1;
    }, []);

    const addPositionToChildren = useCallback((elementId: number, parentPosition: Position, newCards: CardData[]) => {
        const element = newCards.find(({ id }) => elementId === id);
        if (!element) return;
        const children = element.childrenIds;
        if (!children || children.length === 0) return;
        const width = getElementWidth(elementId, newCards);
        let tmp = 0;
        for (let i = 0; i < children.length; i++) {
            const childId = children[i];
            const childLen = getElementWidth(childId, newCards);
            const offset = tmp + childLen * 338 /2;
            tmp += childLen * 338;
            const child = newCards.find(({ id }) => id === childId);
            if (child) {
                const { position } = child;
                position.x = parentPosition.x - width*338/2 + offset;
                position.y = parentPosition.y + 200;
                addPositionToChildren(childId, position, newCards);
            }
        }
    }, [getElementWidth]);

    const rearrange = useCallback((rightCards) => {
        const newCards = [...rightCards];
        const rootElement = newCards.find(({ id }) => id === 1);
        if (rootElement) {
            const width = getElementWidth(1, newCards);
            const offset = (paddingX + cardWidth) * (width - 1) / 2;
            if (offset > rootElement.position.x) {
                rootElement.position.x = offset;
            }
            addPositionToChildren(1, rootElement.position, newCards);
        }
        return newCards;
    }, [getElementWidth, addPositionToChildren]);

    const updateParent = (idToUpdate: number, savedIdToUpdate: string) => {
        setParentId(idToUpdate);
        setParentSavedId(savedIdToUpdate);
    }  

    const viewProps = (id: number) => {
        const newCards = [...rightCards];
        const tempCards = newCards.filter((newCard) => newCard.id !== id);
        if (tempCards) {
            for (let i = 0; i < tempCards.length; i ++) {
                if (tempCards[i].isOpenProps) {
                    tempCards[i].isOpenProps = false;
                }
            }
        }

        const tempCard = newCards.find((newCard) => newCard.id === id);
        if (tempCard) {
            tempCard.isOpenProps = !(tempCard.isOpenProps);
        }

        setRightCards(newCards);
        props.onPropsView(newCards, id);
    }

    const deleteCard = (id: number, savedId: string) => {
        if (id > 0) {
            const newCards = [...rightCards];
            const newBlocks = [...blocks];
            const tempSelectedIds = getElements(id, newCards);
            const tempSelectedBlockIds = getBlockIds(savedId, newBlocks);
            const tempSelCard = newCards.find((newCard) => newCard.id === id);
            if (tempSelCard) {
                const tempParentCard = newCards.find(({ id }) => id === tempSelCard.parentId);
                const tempParentBlock = newBlocks.find(({ id }) => id === tempSelCard.parentSavedId);
                if (tempParentCard) {
                    tempParentCard.childrenIds = tempParentCard.childrenIds.filter((b) => b !== id);
                    tempParentCard.childrenCnt --;
                }
                if (tempParentBlock) {
                    tempParentBlock.fields.edges = tempParentBlock.fields.edges.filter((b) => b !== savedId);
                }

                const nonSelectedCards = rearrange(newCards.filter(({ id }) => !tempSelectedIds.includes(id)));
                const nonSelectedBlocks = newBlocks.filter(({ id }) => !tempSelectedBlockIds.includes(id));
                const selectedBlocks = newBlocks.filter(({ id }) => tempSelectedBlockIds.includes(id));
                const newArrows = drawArrows(nonSelectedCards);
                if (tempSelCard.isOpenProps) {
                    tempSelCard.isOpenProps = false;
                    props.onPropsView(nonSelectedCards, id);
                }
                setSelectedCards([]);
                setSelectedArrows([]);
                setSelectedBlocks([]);
                setIsMoving(false);
                setRightCards(nonSelectedCards);
                setBlocks(nonSelectedBlocks);
                setArrows(newArrows);
                if (id === 1) {
                    setHasFirstCard(false);
                    setCnt(1);
                }
                setSelectedId(-1);
                setSelectedSavedId('');
                deleteBlocks(selectedBlocks);
                props.onDeleteCard(nonSelectedCards);
            }
        }
    }    

    const getElements = useCallback((elementId: number, elements: CardData[]): number[] => {
        const tempCard = elements.find(({ id }) => id === elementId);
        const childrenIds = tempCard?.childrenIds;
        if (!childrenIds || childrenIds?.length === 0) {
            return [elementId];
        }
        let result: number[] = [];
        for (let i = 0; i < childrenIds!.length; i++) {
            const child = childrenIds[i];
            const childElements = getElements(child, elements);
            if (result.find((temp) => temp === elementId)) result = [...result, ...childElements];
            else result = [...result, elementId, ...childElements];
        }
        if (result.length > 0) return result;
        else return [];
    }, []);

    const getBlockIds = useCallback((elementId: string, elements: BlockData[]): string[] => {
        const tempBlock = elements.find(({ id }) => id === elementId);
        if (tempBlock) {
            const edgeIds = tempBlock.fields.edges;
            if (!edgeIds || edgeIds.length === 0) {
                return [elementId];
            }
            let result: string[] = [];
            for (let i = 0; i < edgeIds.length; i ++) {
                const child = edgeIds[i];
                const childElements = getBlockIds(child, elements);
                if (result.find((temp) => temp === elementId)) result = [...result, ...childElements];
                else result = [...result, elementId, ...childElements];
            }
            if (result.length > 0) return result;
            else return [];
        } else return [];
    }, []);

    const saveBlockAndCard = async(card: CardData, block: BlockData) => {
        const data = {
            fields: block.fields
        }
        await axios.post('https://api.airtable.com/v0/appJ6LHBEjhaorG0k/Blocks', data, options)
        .then((res: any) => {
            card.savedId = res.data.id;
            setArrows(drawArrows([...rightCards, card]));
            if (!hasFirstCard) {
                setCnt(2);
                setRightCards([card]);
                setBlocks([res.data]);
                props.onSaveCards([card]);
                props.onSaveBlocks([res.data]);
            }
            else {
                setCnt(cnt+1);
                
                const newCards = [...rightCards];
                const updateCard = newCards.find(({ id }) => id === parentId);
                if (updateCard) {
                    updateCard.childrenSavedIds.push(res.data.id);
                }
                setRightCards([...newCards, card]);
                props.onSaveCards([...rightCards, card]);
                
                const updateBlock = blocks.find(({ id }) => id === parentSavedId);
                if (updateBlock) {
                    if (!updateBlock.fields.edges) {
                        updateBlock.fields = {...updateBlock.fields, edges: []}
                    }
                    updateBlock.fields.edges.push(res.data.id);
                    updateBlocks(updateBlock, [...blocks, res.data]);
                }
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
    }

    const updateBlocks = async(element: BlockData, elements: BlockData[]) => {
        const data = {
            fields: {
                block_type: element.fields.block_type, 
                edges: element.fields.edges
            }
        };
        await axios.patch(`https://api.airtable.com/v0/appJ6LHBEjhaorG0k/Blocks/${parentSavedId}`, data, options)
        .then((res: any) => {
            const newBlocks = [...elements];
            const updateBlock = newBlocks.find(({ id }) => id === parentSavedId);
            if (updateBlock) {
                updateBlock.id = res.data.id;
                updateBlock.fields = res.data.fields;
                updateBlock.createdTime = res.data.createdTime;
                setBlocks(newBlocks);
                props.onSaveBlocks(newBlocks);
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
    }

    const deleteBlocks = async(blocksData: BlockData[]) => {
        for (let i = 0; i < blocksData.length; i ++) {
            await axios.delete(`https://api.airtable.com/v0/appJ6LHBEjhaorG0k/Blocks/${blocksData[i].id}`, options)
            .then((res: any) => {
                console.log(res.data);
            })
            .catch((err: any) => {
                console.log(err);
            })
        }
    }
    
    const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const { pageX, pageY, dataTransfer } = event;
        const activeCard = dataTransfer.getData('activeCard');
        const activeBranch = dataTransfer.getData('activeBranch');

        if (activeCard) {
            const activeData = JSON.parse(activeCard);
            if (!hasFirstCard) {
                setHasFirstCard(true);
                const cardData: CardData = {
                    id: 1, 
                    savedId: '', 
                    name: Right_Card[activeData.id-1].name, 
                    lefticon: Right_Card[activeData.id-1].lefticon, 
                    desc: Right_Card[activeData.id-1].desc, 
                    templateTitle: Right_Card[activeData.id-1].templateTitle, 
                    template: Right_Card[activeData.id-1].template, 
                    begin: Right_Card[activeData.id-1].begin, 
                    hasSelectInput: Right_Card[activeData.id-1].hasSelectInput,
                    isMulti: Right_Card[activeData.id-1].isMulti, 
                    hasTextInput: Right_Card[activeData.id-1].hasTextInput, 
                    selectedOptions: [], 
                    selectedBranchPoint: [], 
                    selectedBranches: [], 
                    selectedFilters: [], 
                    isBranch: false, 
                    addedBranch: '', 
                    position: {
                        x: pageX - 450,
                        y: pageY - 135
                    }, 
                    parentId: 0, 
                    parentSavedId: '', 
                    childrenIds: [], 
                    childrenSavedIds: [], 
                    childrenCnt: 0,
                    isOpenProps: false
                }
                const blockData: BlockData = {
                    id: '', 
                    fields: {
                        // bundle_name: selBundle ? selBundle.fields.name : '', 
                        block_type: [Right_Card[activeData.id-1].id], 
                        // diseases: [], 
                        // appointments: [], 
                        // finds: [], 
                        // dosages: [], 
                        // tests: [], 
                        // _text_template: Right_Card[activeData.id-1].template, 
                        // output_value: '', 
                        // criteria: '', 
                        // calculator: '', 
                        // keypoint: '', 
                        // pathway: '', 
                        // recommendation_match: '', 
                        // output_name: '', 
                        // condition: '', 
                        // references: [], 
                        edges: [], 
                        // protocol: selProtocol ? [selProtocol.id] : []
                    }, 
                    createdTime: ''
                }

                saveBlockAndCard(cardData, blockData);
                formatCanvasState();
            } else if (parentId > 0 && parentSavedId !== '') {
                const newChilds = [...rightCards];
                const childToUpdate = newChilds.find(({id}) => id === parentId);
                if(childToUpdate) {
                    const childrenCount = childToUpdate.childrenCnt;
                    for (let i = 0; i < childrenCount; i ++) {
                        const childs = newChilds.find(({id}) => id === childToUpdate.childrenIds[i]);
                        if (childs) {
                            childs.position.x -= 169;
                        }
                    }
    
                    childToUpdate.childrenCnt ++;
                    childToUpdate.childrenIds.push(cnt);
                    setRightCards(newChilds);

                    const cardData: CardData = {
                        id: (cnt), 
                        savedId: '', 
                        name: Right_Card[activeData.id-1].name, 
                        lefticon: Right_Card[activeData.id-1].lefticon, 
                        desc: Right_Card[activeData.id-1].desc, 
                        templateTitle: Right_Card[activeData.id-1].templateTitle, 
                        template: Right_Card[activeData.id-1].template, 
                        begin: Right_Card[activeData.id-1].begin, 
                        hasSelectInput: Right_Card[activeData.id-1].hasSelectInput, 
                        isMulti: Right_Card[activeData.id-1].isMulti, 
                        hasTextInput: Right_Card[activeData.id-1].hasTextInput, 
                        selectedOptions: [], 
                        selectedBranchPoint: [], 
                        selectedBranches: [], 
                        selectedFilters: [], 
                        isBranch: childToUpdate.name === 'Branch' ? true : false, 
                        addedBranch: '', 
                        position: {
                            x: childToUpdate.position.x + 169*childrenCount, 
                            y: childToUpdate.position.y + 200
                        }, 
                        parentId: parentId, 
                        parentSavedId: parentSavedId, 
                        childrenIds: [], 
                        childrenSavedIds: [], 
                        childrenCnt: 0, 
                        isOpenProps: false
                    }
                    const blockData: BlockData = {
                        id: '', 
                        fields: {
                            // bundle_name: selBundle ? selBundle.fields.name : '', 
                            block_type: [Right_Card[activeData.id-1].id], 
                            // diseases: [], 
                            // appointments: [], 
                            // finds: [], 
                            // dosages: [], 
                            // tests: [], 
                            // _text_template: Right_Card[activeData.id-1].template, 
                            // output_value: '', 
                            // criteria: '', 
                            // calculator: '', 
                            // keypoint: '', 
                            // pathway: '', 
                            // recommendation_match: '', 
                            // output_name: '', 
                            // condition: '', 
                            // references: [], 
                            edges: [], 
                            // protocol: selProtocol ? [selProtocol.id] : []
                        }, 
                        createdTime: ''
                    }
                    saveBlockAndCard(cardData, blockData);
                    formatCanvasState();
                }
            }
        } else if (activeBranch) {
            const activeBranchData = JSON.parse(activeBranch);
            if (hasFirstCard && parentId > 0) {
                const newChilds = [...rightCards];
                const childToUpdate = newChilds.find(({id}) => id === parentId);
                if (childToUpdate) {
                    if (childToUpdate.isBranch === true) {
                        childToUpdate.addedBranch = activeBranchData.data.filter[0].name.replace('...', '') + ' ' + activeBranchData.data.value;
                        childToUpdate.isBranch = true;
                        setRightCards(newChilds);
                        formatCanvasState();
                    }
                }
            }
        } else {
            formatCanvasState();
        }
    }, [cnt, hasFirstCard, parentId, parentSavedId, rightCards]);

    const handleMouseDown = (selId: number, selSavedId: string) => {
        if (selId > -1 && selSavedId !== '') {
            setIsMoving(true);
            setSelectedId(selId);
            setSelectedSavedId(selSavedId);
            
            if (selId === 1)    setMoveFirstChild(true);
            else                setMoveFirstChild(false);
        }
    }

    const handleMouseMove = useCallback((movementX: number, movementY: number, pageX: number, pageY: number, ratio: number, updateId: number, updateSavedId: string) => {
        if (isMoving) {
            if (moveFirstChild) {
                const newChilds = [...rightCards];

                for (let i = 0; i < newChilds.length; i ++) {
                    const {position} = newChilds[i];
                    position.x += movementX/ratio;
                    position.y += movementY/ratio;
                }

                setRightCards(newChilds);
                setArrows(drawArrows(newChilds));
            } else {
                if (isRealMoving) {
                    if(pageX < (paddingLeft+5) || pageY < (paddingTop+5)) {
                        setIsMoving(false);
                        const newCards: CardData[] = [];
                        const newArrows: ArrowData[] = [];
                        setSelectedCards(newCards);
                        setSelectedArrows(newArrows);
                        setIsRealMoving(false);
                        return;
                    }
                    const newCards = [...selectedCards];
                    const selectedCard = newCards.find(({ id }) => id === updateId);
                    const nonSelected = [...rightCards];

                    for (let i = 0; i < nonSelected.length; i ++) {
                        if (((nonSelected[i].position.x+paddingLeft) < pageX && pageX < (nonSelected[i].position.x+paddingLeft+318))
                                && ((nonSelected[i].position.y+paddingTop) < pageY && pageY < (nonSelected[i].position.y+paddingTop+122))) {
                            setUpdatedId(nonSelected[i].id);
                            setUpdatedSavedId(nonSelected[i].savedId);
                            break;
                        } else {
                            setUpdatedId(-1);
                            setUpdatedSavedId('');
                        }
                    }
                    
                    if (selectedCard && selectedCards.length) {
                        for (let i = 0; i < newCards.length; i ++) {
                            const { position } = newCards[i];
                            position.x += movementX/ratio;
                            position.y += movementY/ratio;
                        }
                        
                        const newSelectedArrows = drawArrows(newCards);
                        // setRightCards(nonSelected);
                        setSelectedCards(newCards);
                        setSelectedArrows(newSelectedArrows);
                        setSelectedId(updateId);
                        setSelectedSavedId(updateSavedId);
                    }    
                } else {
                    const newCards = [...rightCards];
                    const newBlocks = [...blocks];
                    const tempSelectedIds = getElements(selectedId, newCards);
                    const tempSelectedBlockIds = getBlockIds(selectedSavedId, newBlocks);
                    const tempSelCard = newCards.find(({ id }) => id === selectedId);
                    if (tempSelCard) {
                        const tempParentCard = newCards.find(({ id }) => id === tempSelCard.parentId);
                        if(tempParentCard) {
                            tempParentCard.childrenIds = tempParentCard.childrenIds.filter((b) => b !== selectedId);
                            
                            const newBlocks = [...blocks];
                            const tempSelBlock = newBlocks.find(({ id }) => id === selectedSavedId);
                            if (tempSelBlock) {
                                const tempParentBlock = newBlocks.find(({ id }) => id === tempSelCard.parentSavedId);
                                if (tempParentBlock) {
                                    tempParentBlock.fields.edges = tempParentBlock.fields.edges.filter((b) => b !== selectedSavedId);
                                }
                            }
                        }
                    }
                    const nonSelectedCards = rearrange(newCards.filter(({ id }) => !tempSelectedIds.includes(id)));
                    const nonSelectedBlocks = newBlocks.filter(({ id }) => !tempSelectedBlockIds.includes(id));
                    const newArrows = drawArrows(nonSelectedCards);
                    
                    const newSelectedCards = rearrange(newCards.filter(({ id }) => tempSelectedIds.includes(id)));
                    const newSelectedBlocks = newBlocks.filter(({ id }) => tempSelectedBlockIds.includes(id));
                    const newSelectedArrows = drawArrows(newSelectedCards);

                    setSelectedCards(newSelectedCards);
                    setSelectedBlocks(newSelectedBlocks);
                    setSelectedArrows(newSelectedArrows);
                    setSelectedId(selectedId);
                    setSelectedSavedId(selectedSavedId);
                    setIsMoving(true);
                    setRightCards(nonSelectedCards);
                    setBlocks(nonSelectedBlocks);
                    setArrows(newArrows);
                    setIsRealMoving(true);
                }
            }
        }
    }, [isMoving, isRealMoving, moveFirstChild, rightCards, blocks, selectedCards, selectedId, selectedSavedId, rearrange, drawArrows, getElements, getBlockIds]);

    const handleMouseUp = useCallback(() => {
        if (moveFirstChild) {
            setMoveFirstChild(false);
	        setSelectedId(-1);
            setSelectedSavedId('');
        } else {
            if (isMoving) setIsMoving(false);
            else return;
            if (isRealMoving) {
                if (selectedId > -1) { 
                    if (updatedId === -1 && updatedSavedId === '') {
                        setSelectedCards([]);
                        setSelectedArrows([]);
                        deleteBlocks(selectedBlocks);
                    } else {
                        const newCards = [...rightCards];
                        const updateCard = newCards.find(({ id }) => id === updatedId);
                        if (updateCard) {
                            updateCard.childrenIds.push(selectedId);
                            updateCard.childrenSavedIds.push(selectedSavedId);
                            updateCard.childrenCnt ++;

                            const tempSelectedCards = [...selectedCards];
                            const tempSelectedCard = tempSelectedCards.find(({ id }) => id === selectedId);
                            if (tempSelectedCard) {
                                tempSelectedCard.parentId = updatedId;
                            }
                            let tempCards = newCards.concat(tempSelectedCards);
                            tempCards = rearrange([...tempCards]);
                            setRightCards(tempCards);
                            const tempArrows = drawArrows(tempCards);
                            setArrows(tempArrows);
                            setSelectedArrows([]);

                            const tempNonSelectedBlocks = [...blocks];
                            const tempUpdateBlock = tempNonSelectedBlocks.find(({ id }) => id === updatedSavedId);
                            if (tempUpdateBlock) {
                                tempUpdateBlock.fields.edges.push(selectedSavedId);
                            }
                            const tempBlocks = tempNonSelectedBlocks.concat(selectedBlocks);
                            setBlocks(tempBlocks);
                        }
                    }
                }
                formatCanvasState();
                setIsRealMoving(false);
            }
        }
    }, [rightCards, blocks, selectedId, selectedSavedId, selectedCards, selectedBlocks, updatedId, updatedSavedId, isMoving, isRealMoving, moveFirstChild, drawArrows, rearrange]);
    
    const handleDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
        let isCardClick: boolean = false;
        if (rightCards) {
            for (let i = 0; i < rightCards.length; i ++) {
                if ((rightCards[i].position.x < (event.pageX - paddingLeft)) && ((event.pageX - paddingLeft) < rightCards[i].position.x + cardWidth) 
                && (rightCards[i].position.y < (event.pageY - paddingTop)) && ((event.pageY - paddingTop) < rightCards[i].position.y + cardHeight)) {
                    isCardClick = true;
                    break;
                }
            }
            if (isCardClick)    setIsCanvasClicking(false);
            else                setIsCanvasClicking(true)
        }
    }, [rightCards]);

    const handleMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (isCanvasClicking) {
            if (rightCards) {
                const newChilds = [...rightCards];
                const ratioX = event.screenX/event.pageX;
                const ratioY = event.screenY/event.pageY;
                const ratio = (ratioX < ratioY) ? ratioX : ratioY;
                for (let i = 0; i < newChilds.length; i ++) {
                    const {position} = newChilds[i];
                    position.x += event.movementX / ratio;
                    position.y += event.movementY / ratio;
                }

                setRightCards(newChilds);
                setArrows(drawArrows(newChilds));
            }
        }
    }, [isCanvasClicking, rightCards, drawArrows]);

    const handleUp = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (isCanvasClicking) {
            setIsCanvasClicking(false);
        }
    }, [isCanvasClicking]);
    
    useEffect(() => {
        const newCards = rearrange(props.cardsData);

        if (newCards.length === 0)  setHasFirstCard(false);
        else                        setHasFirstCard(true);        
        setRightCards(newCards);

        let tempId = 0;
        if (newCards.length === 1) tempId = newCards[0].id;
        else {
            for (let i = 0; i < newCards.length; i ++) {
                for (let j = i + 1; j < newCards.length; j ++) {
                    if (newCards[i].id > newCards[j].id)    tempId = newCards[i].id;
                    else                                    tempId = newCards[j].id;
                }
            }
        }
        setCnt(tempId+1);

        const newArrows = drawArrows(newCards);
        setArrows(newArrows);
    }, [props.cardsData, drawArrows, rearrange]);

    useEffect(() => {
        setBlocks(props.blocksData);
    }, [props.blocksData]);

    return (
        <div 
            id="canvas" 
            style={{cursor: `${isCanvasClicking ? 'grabbing': 'move'}`}}
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            onMouseDown={handleDown} 
            onMouseMove={handleMove} 
            onMouseUp={handleUp}
        >
            {
                rightCards?.map((rightCard) => {
                    return  <RightCard 
                                key={rightCard?.id} 
                                data={rightCard} 
                                onProp={viewProps}
                                onDeleteCard={deleteCard}
                                onOver={updateParent}
                                onLeave={formatParent}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                isMoving={false}
                                isSelected={false}
                                updatedId={updatedId}
                            />
                })
            }
            {
                selectedCards?.map((selectedCard) => {
                    return  <RightCard 
                                key={selectedCard?.id} 
                                data={selectedCard} 
                                onProp={viewProps}
                                onDeleteCard={deleteCard}
                                onOver={updateParent}
                                onLeave={formatParent}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                isMoving={true}
                                isSelected={true}
                                updatedId={updatedId}
                            />
                })
            }
            {
                arrows?.map((arrow) => {
                    return <Arrow key={arrow?.id} data={arrow} isSelected={false} />
                })
            }
            {
                selectedArrows?.map((arrow) => {
                    return <Arrow key={arrow?.id} data={arrow} isSelected={true}/>
                })
            }
        </div>
    );
}

export default Canvas;