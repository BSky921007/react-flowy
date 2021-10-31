import React, { DragEvent, MouseEvent, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { RightCardProps } from '../types';
import {base_url, paddingLeft, paddingTop} from '../Globals';

const RightCard = (props: RightCardProps) => {
    const { id, lefticon, name, desc1, desc2, desc3, desc4, position } = props.data;
    const [isDragOver, setIsDragOver] = React.useState(false);
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

        if ((32 < clickOffsetX && clickOffsetX < 56) && (23 < clickOffsetY && clickOffsetY < 47)) {
            props.onProp(id);
        } else if ((280 < clickOffsetX && clickOffsetX < 293) && (33 < clickOffsetY && clickOffsetY < 46)) {
            const isRemoveCard = true;
            setMoving(false);
            setIsSelected(true);
            props.onDeleteCard(id);
        } else {
            const isRemoveCard = false;
            setMoving(true);
            setIsSelected(true);
            props.onMouseDown(id);
        }
    }
    
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (moving) {
            const { movementX, movementY, pageX, pageY, screenX, screenY } = event;
            const ratioX = event.screenX/event.pageX;
            const ratioY = event.screenY/event.pageY;
            const ratio = (ratioX < ratioY) ? ratioX : ratioY;
            props.onMouseMove(movementX, movementY, pageX, pageY, ratio, id);
        }
    }
    
    const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        const clickOffsetX = event.pageX - paddingLeft - position.x;
        const clickOffsetY = event.pageY - paddingTop - position.y;

        // if ((280 < clickOffsetX && clickOffsetX < 293) && (33 < clickOffsetY && clickOffsetY < 46)) {
        //     const isRemoveCard = true;
        //     setMoving(false);
        //     props.onMouseUp(isRemoveCard);
        // } else {
            // const isRemoveCard = false;
            setMoving(false);
            props.onMouseUp();
        // }
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
            style={{left: position?.x, top: position?.y, opacity: `${props.isSelected? 0.5:1}`}}
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
