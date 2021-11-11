import React, { DragEvent, useState } from 'react';
import { base_url } from '../Globals';
import {LeftCardProps} from '../types';

type CardProps = {
    data: LeftCardProps, 
    open: boolean, 
}

const LeftCard = (props: CardProps) => {
    const {data, open} = props;
    const { id, lefticon, name, desc } = data;

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('activeCard', JSON.stringify({ id }));
    }
   
    return (
        <div 
            className="blockelem create-flowy noselect" 
            draggable={true} 
            onDragStart={handleDragStart} 
            style={{width: `${open&&'318px'}`}}>
        {
            open ? (
                <>
                    <input type="hidden" name='blockelemtype' className="blockelemtype" value="1" />
                    <div className="grabme">
                        <img src={`${base_url}/assets/grabme.svg`} alt="NO"/>
                    </div>
                    <div className="blockin">
                        <div className="blockico">
                            <span></span>
                            <img src={lefticon} alt="NO" style={{width: '24px'}}/>
                        </div>
                        <div className="blocktext">
                            <p className="blocktitle">{name}</p>
                            <p className="blockdesc">{desc}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="blockin">
                        <div className="blockico">
                            <span></span>
                            <img src={lefticon} alt="NO" style={{width: '24px'}}/>
                        </div>
                    </div>
                </>
            )
        }
        </div>
    )
}

export default LeftCard;
