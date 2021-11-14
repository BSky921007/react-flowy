import React, { DragEvent, MouseEvent, useState, useCallback, useEffect } from 'react';
import RightCard from './RightCard';
import Arrow from './Arrow';
import { Right_Card, cardWidth, paddingX, paddingLeft, paddingTop, cardHeight } from '../Globals';
import { ArrowData, CardData, Position, CanvasProps } from '../types';

const Canvas = (props: CanvasProps) => {
    // console.log(props.data);
    const [hasFirstCard, setHasFirstCard] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [isRealMoving, setIsRealMoving] = useState(false);
    const [isCanvasClicking, setIsCanvasClicking] = useState(false);
    const [moveFirstChild, setMoveFirstChild] = useState(false);
    const [cnt, setCnt] = useState(1);
    const [parentId, setParentId] = useState(-1);
    const [selectedId, setSelectedId] = useState(-1);
    const [updatedId, setUpdatedId] = useState(-1);
    const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
    const [rightCards, setRightCards] = useState<CardData[]>(props.data);
    const [arrows, setArrows] = useState<ArrowData[]>([]);
    const [selectedArrows, setSelectedArrows] = useState<ArrowData[]>([]);

    const drawArrows = useCallback((elements: CardData[]): ArrowData[] => {
        const newArrow: ArrowData[] = [];
        for (let i = 0; i < elements.length; i ++) {
            const tempParent = elements.find(({id}) => id === elements[i].parentId);
            const tempSelf = elements.find(({id}) => id === elements[i].id);
            let line, triangle;
            if (tempParent && tempSelf) {
                line = `M${tempParent!.position.x+159} ${tempParent!.position.y+122} L${tempParent!.position.x+159} ${tempParent!.position.y+162} L${tempSelf!.position.x+159} ${tempParent!.position.y+162} L${tempSelf!.position.x+159} ${tempParent!.position.y+202}`;
                triangle = `M${tempSelf!.position.x+159} ${tempParent!.position.y+200} L${tempSelf!.position.x+154} ${tempParent!.position.y+195} L${tempSelf!.position.x+164} ${tempParent!.position.y+195} Z`;
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
        const childrenIds = tempCard?.children;
        if (!childrenIds || childrenIds?.length === 0) return 1;
        let childWidth = 0;

        for (let i = 0; i < childrenIds!.length ; i++) {
            const child = childrenIds[i];
            childWidth += getElementWidth(child, elements);
        }
        if (childWidth > 0) return childWidth;
        else return 1;
    }, []);

    const addPositionToChildren = useCallback((elementId: number, parentPosition: Position, newCards: CardData[]) => {
        const element = newCards.find(({ id }) => elementId === id);
        if (!element) return;
        const children = element.children;
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
                rootElement.position.x = (paddingX + cardWidth) * (width - 1) / 2;
            }
            addPositionToChildren(1, rootElement.position, newCards);
        }
        return newCards;
    }, [getElementWidth, addPositionToChildren]);
    // }, [getElementWidth, addPositionToChildren, getElements]);

    useEffect(() => {
        const newCards = rearrange(props.data);
        if (newCards.length === 0) {
            setHasFirstCard(false);
        }
        setRightCards(newCards);
        const newArrows = drawArrows(newCards);
        setArrows(newArrows);
    }, [props.data, drawArrows, rearrange]);
    // }, [props.data]);

    const updateParent = (idToUpdate: number) => {
        setParentId(idToUpdate);
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

    const deleteCard = (id: number) => {
        if (id > 0) {
            const newCards = [...rightCards];
            const tempSelectedIds = getElements(id, newCards);
            const tempSelCard = newCards.find((newCard) => newCard.id === id);
            if (tempSelCard) {
                const tempParentCard = newCards.find((newCard) => newCard.id === tempSelCard.parentId);
                if(tempParentCard) {
                    tempParentCard.children = tempParentCard.children.filter((b) => b !== id);
                    tempParentCard.childrenCnt --;
                }
                const nonSelectedCards = rearrange(newCards.filter((newCard) => !tempSelectedIds.includes(newCard.id)));
                const newArrows = drawArrows(nonSelectedCards);
                const emptyArrows: ArrowData[] = [];
                const emptyCards: CardData[] = [];
                if (tempSelCard.isOpenProps) {
                    tempSelCard.isOpenProps = false;
                    props.onPropsView(nonSelectedCards, id);
                }
                setSelectedCards(emptyCards);
                setSelectedArrows(emptyArrows);
                setIsMoving(false);
                setRightCards(nonSelectedCards);
                setArrows(newArrows);
                if (id === 1) {
                    setHasFirstCard(false);
                    setCnt(1);
                }
                setSelectedId(-1);
            }
        }
    }

    const formatParent = () => {
        setParentId(-1);
    }  

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
                const data: CardData = {
                    id: 1, 
                    name: Right_Card[activeData.id-1].name, 
                    lefticon: Right_Card[activeData.id-1].lefticon, 
                    desc: Right_Card[activeData.id-1].desc, 
                    templateTitle: Right_Card[activeData.id-1].templateTitle, 
                    template: Right_Card[activeData.id-1].template, 
                    begin: Right_Card[activeData.id-1].begin, 
                    isMulti: Right_Card[activeData.id-1].isMulti, 
                    selectedOptions: [], 
                    selectedBranches: [], 
                    selectedFilters: [], 
                    isBranch: false, 
                    addedBranch: '', 
                    position: {
                        x: pageX - 450,
                        y: pageY - 135
                    }, 
                    parentId: 0, 
                    children: [], 
                    childrenCnt: 0,
                    isOpenProps: false
                }
                setCnt(2);
                setParentId(0);
                setUpdatedId(-1);
                setRightCards([...rightCards, data]);
            } else if (parentId > 0) {
                const newChilds = [...rightCards];
                const childToUpdate = newChilds.find(({id}) => id === parentId);
                
                if(childToUpdate) {
                    const childrenCount = childToUpdate.childrenCnt;
                    for (let i = 0; i < childToUpdate.children.length; i ++) {
                        const childs = newChilds.find(({id}) => id === childToUpdate.children[i]);
                        if (childs) {
                            childs.position.x -= 169;
                        }
                    }
    
                    childToUpdate.childrenCnt ++;
                    childToUpdate.children.push(cnt);

                    const data: CardData = {
                        id: (cnt), 
                        name: Right_Card[activeData.id-1].name, 
                        lefticon: Right_Card[activeData.id-1].lefticon, 
                        desc: Right_Card[activeData.id-1].desc, 
                        templateTitle: Right_Card[activeData.id-1].templateTitle, 
                        template: Right_Card[activeData.id-1].template, 
                        begin: Right_Card[activeData.id-1].begin, 
                        isMulti: Right_Card[activeData.id-1].isMulti, 
                        selectedOptions: [], 
                        selectedBranches: [], 
                        selectedFilters: [], 
                        isBranch: childToUpdate.name === 'Branch' ? true : false, 
                        addedBranch: '', 
                        position: {
                            x: childToUpdate.position.x + 169*childrenCount, 
                            y: childToUpdate.position.y + 200
                        }, 
                        parentId: parentId, 
                        children: [], 
                        childrenCnt: 0, 
                        isOpenProps: false
                    }
    
                    const newCards = rearrange([...newChilds, data]);
                    const newArrows = drawArrows(newCards);
                    
                    setCnt(cnt+1);
                    setRightCards(newCards);               
                    setArrows([...newArrows]);
                    setParentId(-1);
                    setUpdatedId(-1);
                }
            }
        } else if (activeBranch) {
            const activeBranchData = JSON.parse(activeBranch);
            if (hasFirstCard && parentId > 0) {
                const newChilds = [...rightCards];
                const childToUpdate = newChilds.find(({id}) => id === parentId);
                if (childToUpdate) {
                    if (childToUpdate.isBranch === true) {
                        childToUpdate.addedBranch = activeBranchData.data.name;
                        childToUpdate.isBranch = true;
                        setRightCards(newChilds);
                        setParentId(-1);
                        setUpdatedId(-1);
                    }
                }
            }
        } else {
            setParentId(-1);
            setUpdatedId(-1);
        }
    }, [cnt, hasFirstCard, parentId, rightCards, drawArrows, rearrange]);
    // }, [hasFirstCard, parentId]);

    const handleMouseDown = (selId: number) => {
        if (selId > -1) {
            setIsMoving(true);
            setSelectedId(selId);
            
            if (selId === 1)    setMoveFirstChild(true);
            else                setMoveFirstChild(false);
        }
    }
    // }, [rightCards, selectedCards]);

    const handleMouseMove = useCallback((movementX: number, movementY: number, pageX: number, pageY: number, ratio: number, updateId: number) => {
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
                    const newChilds = [...selectedCards];
                    const selectedCard = newChilds.find((newCard) => newCard.id === updateId);
                    const nonSelected = [...rightCards];

                    for (let i = 0; i < nonSelected.length; i ++) {
                        if (((nonSelected[i].position.x+paddingLeft) < pageX && pageX < (nonSelected[i].position.x+paddingLeft+318))
                                && ((nonSelected[i].position.y+paddingTop) < pageY && pageY < (nonSelected[i].position.y+paddingTop+122))) {
                            setUpdatedId(nonSelected[i].id);
                            break;
                        } else {
                            setUpdatedId(-1);
                        }
                    }
                    const newSelectedArrows = drawArrows(newChilds);
        
                    if (selectedCard && selectedCards.length) {
                        for (let i = 0; i < newChilds.length; i ++) {
                            const { position } = newChilds[i];
                            position.x += movementX/ratio;
                            position.y += movementY/ratio;
                        }
        
                        setRightCards(nonSelected);
                        setSelectedCards(newChilds);
                        setSelectedArrows(newSelectedArrows);
                        setSelectedId(updateId);
                    }    
                } else {
                    const newCards = [...rightCards];
                    const tempSelectedIds = getElements(selectedId, newCards);
                    const tempSelCard = newCards.find((newCard) => newCard.id === selectedId);
                    if (tempSelCard) {
                        const tempParentCard = newCards.find((newCard) => newCard.id === tempSelCard.parentId);
                        if(tempParentCard) {
                            tempParentCard.children = tempParentCard.children.filter((b) => b !== selectedId);
                        }
                    }
                    const nonSelectedCards = rearrange(newCards.filter((newCard) => !tempSelectedIds.includes(newCard.id)));
                    const newArrows = drawArrows(nonSelectedCards);
                    
                    const newSelectedCards = rearrange(newCards.filter((newCard) => tempSelectedIds.includes(newCard.id)));
                    const newSelectedArrows = drawArrows(newSelectedCards);
                    setSelectedCards(newSelectedCards)
                    setSelectedArrows(newSelectedArrows);
                    setSelectedId(selectedId);
                    setIsMoving(true);
                    setRightCards(nonSelectedCards);
                    setArrows(newArrows);
                    setIsRealMoving(true);
                }
            }
        }
    }, [isMoving, isRealMoving, moveFirstChild, rightCards, selectedCards, selectedId, rearrange, drawArrows, getElements]);
    // }, [selectedCards, selectedId, rightCards, updatedId, isRealMoving]);

    const handleMouseUp = useCallback(() => {
        if (moveFirstChild) {
            setMoveFirstChild(false);
	        setSelectedId(-1);
        } else {
            if (isMoving) setIsMoving(false);
            else return;
            if (isRealMoving) {
                if (selectedId > -1) { 
                    const newCards: CardData[] = [];
                    const newArrows: ArrowData[] = [];
                    const newSelectedArrows: ArrowData[] = [];
                    if (updatedId === -1) {
                        setSelectedCards(newCards);
                        setSelectedArrows(newArrows);
                    } else {
                        const newCards = [...rightCards];
                        const updateCard = newCards.find(({ id }) => id === updatedId);
                        if (updateCard) {
                            updateCard.children.push(selectedId);
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
                            setSelectedArrows(newSelectedArrows);
                        }
                    }
                }
                setSelectedId(-1);
                setUpdatedId(-1); 
                setIsRealMoving(false);
            }
        }
    }, [rightCards, selectedId, selectedCards, updatedId, isMoving, isRealMoving, moveFirstChild, drawArrows, rearrange]);
    // }, [selectedId, updatedId, isRealMoving]);
    
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