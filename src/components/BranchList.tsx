import React, { DragEvent } from 'react';
import IconButton from '@mui/material/Button';
import { base_url } from '../Globals';
import { BranchProps } from '../types';

type BranchPropsType = {
    data: BranchProps, 
    deleteBranch: Function
}

const BranchList = (props: BranchPropsType) => {
    const { data } = props;

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('activeBranch', JSON.stringify(data));
    }

    const deleteBranch = () => {
        props.deleteBranch(data.id);
    }
   
    return (
        <div draggable={true} onDragStart={handleDragStart}>
            <div className="branchlist" key={data.id}> 
                <IconButton className="crossbutton" color="primary" onClick={deleteBranch}>
                    <img src={`${base_url}/assets/cross_circle.svg`} alt="NO" />
                </IconButton>
                Branch {data.id} : {data.data.name}
            </div>
        </div>
    )
}

export default BranchList;
