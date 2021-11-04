import React, { DragEvent, MouseEvent, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { RightCardProps } from '../types';
import {base_url, paddingLeft, paddingTop} from '../Globals';

const RightCard = (props: RightCardProps) => {
    const { id, lefticon, name, desc1, desc2, desc3, desc4, position, isOpenProps } = props.data;
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [openProps, setOpenProps] = React.useState(isOpenProps);
    const [moving, setMoving] = React.useState(props.isMoving);
    const [isRemove, setIsRemove] = React.useState(false);
    const [isSelected, setIsSelected] = React.useState(props.isSelected);
    const [updatedId, setUpdatedId] = React.useState(props.updatedId);
    
    const handleDragOver = React.useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!isDragOver) {
            setIsDragOver(true);
        }
        props.onOver(id);
    }, [isDragOver]);

    const handleDragLeave = React.useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (isDragOver) {
            setIsDragOver(false);
        }

        props.onLeave();
    }, [isDragOver]);

    const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        const clickOffsetX = event.pageX - paddingLeft - position.x;
        const clickOffsetY = event.pageY - paddingTop - position.y;
        // console.log('mouse down on right card', id);

        const cardWidth = 318;
        const xButtonWidth = 43

        const topBarHeight = 51;
        const topBarMargin = 20;

        const xButtonEndX = cardWidth - topBarMargin
        const xButtonStartX = xButtonEndX - xButtonWidth
        
        const topBarStartY = topBarMargin
        const topBarEndY = topBarStartY + topBarHeight

        if ((topBarMargin < clickOffsetX && clickOffsetX < xButtonStartX) && 
            (topBarStartY < clickOffsetY && clickOffsetY < topBarEndY)) {
            setMoving(true);
            setIsSelected(true);
            props.onMouseDown(id);
        } else if ((xButtonStartX < clickOffsetX && clickOffsetX < xButtonEndX) && 
                   (topBarStartY < clickOffsetY && clickOffsetY < topBarEndY)) {
            setMoving(false);
            setIsSelected(true);
            props.onDeleteCard(id);
        } else {
            props.onProp(id);
            // setOpenProps(!openProps);
        }
    }
    
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (moving) {
            const { movementX, movementY, pageX, pageY } = event;
            const ratioX = event.screenX/event.pageX;
            const ratioY = event.screenY/event.pageY;
            const ratio = (ratioX < ratioY) ? ratioX : ratioY;
            props.onMouseMove(movementX, movementY, pageX, pageY, ratio, id);
        }
    }
    
    const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        if (moving) {
            setMoving(false);
            props.onMouseUp();
        }
    }

    var offsetXTemp = document.getElementById(`block-${id}`)?.offsetWidth ? document.getElementById(`block-${id}`)!.offsetWidth/2 : 0;    

    return (
        <div id={`block-${id}`} 
            className="blockelem noselect block rightcard"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{left: position?.x, top: position?.y, opacity: `${props.isSelected? 0.5:1}`, border: `${isOpenProps?'2px solid #217CE8':'0px' }`}}
        >
            <div className='blockyleft' style={{pointerEvents: 'none'}}>
                <IconButton aria-label="delete" size="large">
                    <img src={lefticon} alt="NO"/>
                </IconButton>
                <p className='blockyname'>{name}</p>
            </div>
            <div className='blockyright' style={{pointerEvents: 'none'}}>
                <IconButton aria-label="delete" size="large">
                    <img src={`${base_url}/assets/close.svg`} alt="NO"/>
                </IconButton>
            </div>
            <div className='blockydiv'  style={{pointerEvents: 'none'}}></div>
            <div className='blockyinfo'  style={{pointerEvents: 'none'}}>{desc1}<span>{desc2}</span>{desc3}<span>{desc4}</span></div>
            <div className={`indicator ${(isDragOver || props.updatedId === id)? '' : 'invisible'}`}  style={{pointerEvents: 'none', left: `${offsetXTemp-7}px`}}></div>
        </div>
    )
}

export default React.memo(RightCard);
