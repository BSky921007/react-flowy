import React, { DragEvent, useState } from 'react';
import Select from 'react-dropdown-select';
import { IconButton } from '@chakra-ui/react';
// import ToggleButton from '@mui/material/ToggleButton';
import { ReactComponent as DeleteIcon} from '../delete_icon.svg';
import { base_url } from '../Globals';
import { BranchProps, SelectTypes } from '../types';

// type BranchPropsType = {
//     data: BranchProps, 
//     deleteBranch: Function
// }

type BranchPropsType = {
    data: BranchProps, 
    selectableFilter: SelectTypes[], 
    deleteBranch: Function
}

const BranchList = (props: BranchPropsType) => {
    const { data, selectableFilter } = props;    
    const [selectedValue, setSelectedValue] = useState<string | undefined>(data.data.value);
    const [selectedFilter, setSelectedFilter] = useState<SelectTypes[]>(data.data.filter);
    const [selectableFilters, setSelectableFilters] = useState<SelectTypes[]>([]);

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('activeBranch', JSON.stringify(data));
    }
    
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    }

    const deleteBranch = () => {
        props.deleteBranch(data.id);
    }
   
    return (
        <div className="branches" draggable={true} onDragStart={handleDragStart}>
            <IconButton
                aria-label=""
                icon={<DeleteIcon style={{width: 24, height: 24}} />}
                onClick={deleteBranch}>
            </IconButton>
            <span className="branchname">Branch {data.id}</span>
            <Select
                className="addfilterselect"
                style={{width: '104px'}}
                options={selectableFilter}
                values={selectedFilter}
                onChange={() => {}}
                labelField="name"
                valueField="id"
            />
            <input className="filterinput" type="text" value={selectedValue} onChange={handleTextChange}/>
        </div>
    )
}

export default BranchList;
