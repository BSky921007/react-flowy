import React, { DragEvent, MouseEvent, useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { RightCardProps } from '../types';
import {base_url, paddingLeft, paddingTop} from '../Globals';

const RightCard = (props: RightCardProps) => {
    const { id, lefticon, name, template, addedBranch, begin, position, isOpenProps } = props.data;
    const [isDragOver, setIsDragOver] = useState(false);
    const [moving, setMoving] = useState(props.isMoving);
    const [isAddBranch, setIsAddBranch] = useState(false);

    const templateIsDefault = (template.indexOf('${') > -1) || (template.length === 0);

    const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const offsetY = event.pageY - position.y;
        if (offsetY < 121)  setIsAddBranch(true);
        else                setIsAddBranch(false);
        if (!isDragOver) {
            setIsDragOver(!isDragOver);
        }
        props.onOver(id);
    }, [id, position.y, props, isDragOver]);

    const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (isDragOver) {
            setIsDragOver(!isDragOver);
        }
        props.onLeave();
    }, [props, isDragOver]);
    
    const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        const clickOffsetX = event.pageX - paddingLeft - position.x;
        const clickOffsetY = event.pageY - paddingTop - position.y;

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
            props.onMouseDown(id);
        } else if ((xButtonStartX < clickOffsetX && clickOffsetX < xButtonEndX) && 
                   (topBarStartY < clickOffsetY && clickOffsetY < topBarEndY)) {
            setMoving(false);
            props.onDeleteCard(id);
        } else {
            props.onProp(id);
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
    var offsetYTemp = document.getElementById(`block-${id}`)?.offsetHeight ? document.getElementById(`block-${id}`)!.offsetHeight-122 : 0;

    return (
        <>
        <div className="branchinfo" style={{left: position.x, top: position.y-30}}>
            {addedBranch}
        </div>
        <div id={`block-${id}`} 
            className="blockelem noselect block rightcard"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{left: position?.x, top: position?.y, opacity: `${props.isSelected? 0.5:1}`, border: `2px solid ${isOpenProps ? '#217CE8' : '#C5CCD0' }`}}
        >
            <div className='blockyleft' style={{pointerEvents: 'none'}}>
                <IconButton aria-label="delete" size="large">
                    <img src={lefticon} alt="NO" style={{width: '24px'}}/>
                </IconButton>
                <p className='blockyname'>{name}</p>
            </div>
            <div className='blockyright' style={{pointerEvents: 'none'}}>
                <IconButton aria-label="delete" size="large">
                    <img src={`${base_url}/assets/close.svg`} alt="NO"/>
                </IconButton>
            </div>
            <div className='blockydiv' style={{pointerEvents: 'none'}}></div>
            <div className='blockyinfo' style={{pointerEvents: 'none'}}>
                <span className='blockyinfoTextLabel'>{begin}</span>
                { 
                    templateIsDefault ?
                        <span className='blockyinfoTextLabel'>[...]</span> 
                    :
                        <span className='blockyinfoTextValue'>{template}</span> 
                }
            </div>
            {
                isAddBranch ? (
                    <div className={`indicator ${(isDragOver || props.updatedId === id) ? '' : 'invisible'}`}  style={{pointerEvents: 'none', left: `${offsetXTemp-7}px`, top: `${offsetYTemp}px`}}></div>
                ) : (
                    <div className={`indicator ${(isDragOver || props.updatedId === id) ? '' : 'invisible'}`}  style={{pointerEvents: 'none', left: `${offsetXTemp-7}px`}}></div>
                )
            }
        </div>
        </>
    )
}
export default React.memo(RightCard);

// default border color #E9E9EF, C5CCD0