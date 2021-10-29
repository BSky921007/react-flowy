import React, { DragEvent, MouseEvent, useCallback } from 'react';
import { RightCardProps } from '../types';

const RightCard = (props: RightCardProps) => {
    const { id, lefticon, righticon, name, desc1, desc2, desc3, desc4, position } = props.data;
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [moving, setMoving] = React.useState(props.isMoving);
    const [isSelected, setIsSelected] = React.useState(props.isSelected);
    const [updatedId, setUpdatedId] = React.useState(props.updatedId);
    
    console.log(props.updatedId, props.isSelected);
    // console.log(id, updatedId);

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

    const handleMouseDown = () => {
        setMoving(true);
        setIsSelected(true);
        props.onMouseDown(id);
    }
    
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        console.log(moving);
        // console.log(event.pageX, event.pageY);
        if (moving) {
            const { movementX, movementY, pageX, pageY, screenX, screenY } = event;
            const ratioX = event.screenX/event.pageX;
            const ratioY = event.screenY/event.pageY;
            const ratio = (ratioX < ratioY) ? ratioX : ratioY;
            // if (ratioX > ratioY) ratio
            props.onMouseMove(movementX, movementY, pageX, pageY, ratio, id);
        }
    }
    
    const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        setMoving(false);
        // const { movementX, movementY } = event;
        props.onMouseUp();
    }

    var offsetXTemp = document.getElementById(`block-${id}`)?.offsetWidth ? document.getElementById(`block-${id}`)!.offsetWidth/2 : 0;    

    return (
        <div id={`block-${id}`} 
            className="blockelem noselect block"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{left: position?.x, top: position?.y, opacity: `${props.isSelected? 0.5:1}`}}
        >
            <div className='blockyleft' style={{pointerEvents: 'none'}}>
                <img src={lefticon} />
                <p className='blockyname'>{name}</p>
            </div>
            <div className='blockyright' style={{pointerEvents: 'none'}}>
                <img src={righticon} />
            </div>
            <div className='blockydiv'  style={{pointerEvents: 'none'}}></div>
            <div className='blockyinfo'  style={{pointerEvents: 'none'}}>{desc1}<span>{desc2}</span>{desc3}<span>{desc4}</span></div>
            <div className={`indicator ${(isDragOver || props.updatedId === id)? '' : 'invisible'}`}  style={{pointerEvents: 'none', left: `${offsetXTemp-7}px`}}></div>
        </div>
    )
}

export default React.memo(RightCard);
