import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import { IconButton } from '@chakra-ui/react';
import { ReactComponent as DeleteIcon} from '../delete_icon.svg';
import { ReactComponent as VerticalIcon} from '../grip_vertical_icon.svg';
import { Filter_Conditions, Filter_Names, Filter_Age_Filters, Filter_Sex_Filters, Filter_LastFollowUp_Filters, Filter_PastMedicalHistory_Filters } from '../Globals';
import { FilterProps, SelectTypes } from '../types';

type ConditionType = {
    id: string, 
    name: string
};

type FilterPropsType = {
    data: FilterProps, 
    deleteFilter: Function
}

const FilterList = (props: FilterPropsType) => {
    const { data } = props;
    console.log(data);

    const [selectedName, setSelectedName] = useState<SelectTypes[]>(data.data.name);
    const [selectedCondition, setSelectedCondition] = useState<SelectTypes[]>(data.data.condition);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(data.data.value);
    const [selectedFilter, setSelectedFilter] = useState<SelectTypes[]>(data.data.filter);
    const [selectableFilters, setSelectableFilters] = useState<SelectTypes[]>([]);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    }

    const changeFilterName = (value: any) => {
        setSelectedFilter([]);
        switch (value[0].type) {
            case 'number': 
            setSelectableFilters(Filter_Age_Filters);
            break;
            case 'string': 
            setSelectableFilters(Filter_Sex_Filters);
            break;
            case 'datetime': 
            setSelectableFilters(Filter_LastFollowUp_Filters);
            break;
            case 'array': 
            setSelectableFilters(Filter_PastMedicalHistory_Filters);
            break;
            default: 
            setSelectableFilters([]);
        }
    }
        
    const deleteFilter = () => {
        props.deleteFilter(data.id);
    }

    return (
        <div className="selectgroup" style={{marginTop: '5px'}}>
            {
                data.id === 1 ? (
                    <span className="addfilterstatic">Where</span>
                ) : (
                    <Select
                        className="addfilterselect"
                        style={{width: '53px'}}
                        options={Filter_Conditions}
                        values={selectedCondition}
                        onChange={() => {}}
                        labelField="name"
                        valueField="id"
                    />
                )
            }
            <Select
                className="addfilterselect"
                style={{width: '102px'}}
                options={Filter_Names}
                values={selectedName}
                onChange={(value) => {changeFilterName(value);}}
                labelField="name"
                valueField="id"
            />
            <Select
                className="addfilterselect"
                style={{width: '102px'}}
                options={selectableFilters}
                values={selectedFilter}
                onChange={() => {}}
                labelField="name"
                valueField="id"
            />
            <input className="filterinput" type="text" value={selectedValue} onChange={handleTextChange}/>
            <IconButton
                aria-label=""
                icon={<DeleteIcon style={{width: 24, height: 24}} />}
                onClick={deleteFilter}>
            </IconButton>
            <IconButton
                aria-label=""
                icon={<VerticalIcon style={{width: 24, height: 24}} />}
                onClick={deleteFilter}>
            </IconButton>
        </div>
    )
}

export default FilterList;

