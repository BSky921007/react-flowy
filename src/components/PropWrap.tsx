import React, { useEffect, useState, useCallback, CSSProperties, Suspense } from 'react';
import Select from 'react-dropdown-select';
import styled from '@emotion/styled';
import { List, AutoSizer, ListProps } from 'react-virtualized';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import BranchList from './BranchList';
import FilterList from './FilterList';
import Link_Names from '../data/pathways.json';
import Use_Names from '../data/calculators.json';
import Schedule_Names from '../data/specialties.json';
import Apply_Names from '../data/keypoints.json';
import Record_Names from '../data/diseases.json';
import Elicit_Names from '../data/findings.json';
import Prescribe_Names from '../data/dosages.json';
import Order_Names from '../data/tests.json';
import Custom_Names from '../data/references.json';
import Criteria_Names from '../data/criterias.json';
import Period_Names from '../data/periods.json';
import { base_url, Filter_Conditions, Filter_Names, Filter_Age_Filters, Filter_Sex_Filters, Filter_PastMedicalHistory_Filters, Filter_LastFollowUp_Filters } from '../Globals';
import { PropWrapProps, SelectTypes, BranchTypes, BranchData, BranchProps, FilterProps, BundleType, ProtocolType } from '../types';

import {
  DbProvider,
  Database,
  Calculator,
  Pathway,
  Drug,
  NoteEditor,
  PathwayThemeProvider,
} from '@pathwaymd/pathway-ui2'

import { View, ViewComponent } from 'react-native';

import untypedCollectedDb from '../data/parsed.test.json'
const collectedDb = (untypedCollectedDb.objects as unknown) as Database;

const PropWrap = (props: PropWrapProps) => {
  const { bundles, protocols, selBundle, selProtocol } = props;
  const [selectedOptions, setSelectedOptions] = useState<SelectTypes[]>([]);
  const [actionType, setActionType] = useState<string>('');
  const [structureType, setStructureType] = useState<string>('');
  const [actions, setActions] = useState<SelectTypes[]>([]);
  const [selectedBranchName, setSelectedBranchName] = useState<BranchData[]>([]);
  const [branches, setBranches] = useState<BranchProps[]>([]);
  const [filters, setFilters] = useState<FilterProps[]>([]);

  
  const [selectedFilterCondition, setSelectedFilterCondition] = useState<SelectTypes[]>([]);
  const [selectedFilterName, setSelectedFilterName] = useState<SelectTypes[]>([]);
  const [selectedFilterFilter, setSelectedFilterFilter] = useState<SelectTypes[]>([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>('');
  const [selectableFilters, setSelectableFilters] = useState<SelectTypes[]>([]);
  const [selectedBranchPoint, setSelectedBranchPoint] = useState<SelectTypes[]>([]);
  
  const [open, setOpen] = useState(false);
  const [isGlobal, setIsGlobal] = useState(props.isGlobal);
  const [selectedBundle, setSelectedBundle] = useState<BundleType>();
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType>();
  const [protocolName, setProtocolName] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [propCard, setPropCard] = useState(props.propData);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    setIsGlobal(props.isGlobal);
    if (!props.propData) {
      setOpen(false);
      return;
    }
    
    setOpen(props.data);
    setPropCard(props.propData);
    setInputData(props.propData.template);
    setSelectedOptions(props.propData.selectedOptions);
    setSelectedBranchPoint(props.propData.selectedBranchPoint);
    setBranches(props.propData.selectedBranches);
    setFilters(props.propData.selectedFilters);
    setSelectedBranchName([]);

    if (props.propData.name === 'Repeat timer') {
      setActionType('Repeat timer');
      setStructureType('');
      setActions(Period_Names);
    } else if (props.propData.name === 'Elicit') {
      setActionType('Elicit');
      setStructureType('');
      setActions(Elicit_Names);
    } else if (props.propData.name === 'Prescribe') {
      setActionType('Prescribe');
      setStructureType('');
      setActions(Prescribe_Names);
    } else if (props.propData.name === 'Order') {
      setActionType('Order');
      setStructureType('');
      setActions(Order_Names);
    } else if (props.propData.name === 'Apply') {
      setActionType('Apply');
      setStructureType('');
      setActions(Apply_Names);
    } else if (props.propData.name === 'Link') {
      setActionType('Link');
      setStructureType('');
      setActions(Link_Names);
    } else if (props.propData.name === 'Use') {
      setActionType('Use');
      setStructureType('');
      setActions(Use_Names);
    } else if (props.propData.name === 'Schedule') {
      setActionType('Schedule');
      setStructureType('');
      setActions(Schedule_Names);
    } else if (props.propData.name === 'Record') {
      setActionType('Record');
      setStructureType('');
      setActions(Record_Names);
    } else if (props.propData.name === 'Custom') {
      setActionType('Custom');
      setStructureType('');
      setActions(Custom_Names); 
    } else if (props.propData.name === 'Branch') {
      setStructureType('Branch');
      setActionType('');
    } else if (props.propData.name === 'Include') {
      setStructureType('Include');
      setActionType('');
    } else {
      setActionType('');
      setStructureType('');
      setActions([]); 
    }
  }, [props]);

  useEffect(() => {
    setSelectedBundle(selBundle ? selBundle : bundles[0]);
  }, [bundles, selBundle]);

  useEffect(() => {
    setSelectedProtocol(selProtocol ? selProtocol : protocols[0]);
    setProtocolName(selProtocol ? selProtocol.fields.name : protocols[0]?.fields?.name);
  }, [protocols, selProtocol]);

  const customDropdownRenderer = useCallback(({ methods, state, props }) => {
    return (
      <AutoSizer style={{ height: '200px' }}>
        {({width, height}) => {
          return (
            <List
              style={{overflow: 'auto', height: '200px', maxHeight: '200px'}}
              height={height}
              rowCount={actions.length}
              rowHeight={40}
              width={width - 2}
              rowRenderer={({ index, style, key }: { index: number, style: CSSProperties, key: string }) => (
                  <Item key={key}
                        style={style}
                        onClick={() => methods.addItem(actions[index])}
                  >
                    {actions[index].name}
                  </Item>
                )
              }
            />
          )
        }}
      </AutoSizer>
    );
  }, [actions]);

  const handleOpen = () => {
    setOpen(false);
    setIsGlobal(false);
	}

  const openNew = () => {
    setOpenModal(!openModal);
  }

  const deleteBlock = () => {
    props.onDelete();
  }

  const onSave = () => {
    props.onSave(selectedOptions, inputData);
  }

  const onCancel = () => {
    setInputData(props.propData.template);
    setSelectedOptions(props.propData.selectedOptions);
  }

  const changeBundle = (event: BundleType[]) => {
    setSelectedBundle(event[0]);
    if (protocols) {
      const tempProtocol = protocols.find(({ id }) => id === event[0].fields.protocols[0]);
      if (tempProtocol) {
        setSelectedProtocol(tempProtocol);
        setProtocolName(tempProtocol.fields.name);
      }
    }
  }

  const changeProtocol = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProtocolName(event.target.value);
  }

  const onGlobalSave = () => {
    const tempProtocol = selectedProtocol;
    if (tempProtocol) {
      tempProtocol.fields.name = protocolName;
      props.onGlobalSave(selectedBundle, tempProtocol);
    }
  }

  const onGlobalCancel = () => {
    setSelectedBundle(bundles[0]);
    setSelectedProtocol(protocols[0]);
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(event.target.value);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilterValue(event.target.value);
  }

  const onBranchSave = () => {
    const newBranches = [...branches];

    let temp = newBranches.length === 0 ? 0 : newBranches[newBranches.length-1].id;
    const tempBranch = {
      id: temp + 1, 
      data: {
        filter: selectedFilterFilter, 
        value: selectedFilterValue, 
      }
    }
    setBranches([...newBranches, tempBranch]);
    setSelectedFilterFilter([]);
    setSelectedFilterValue('');
    setOpenModal(!openModal);
    props.onSaveBranch([...newBranches, tempBranch]);
  }
  
  const deleteBranch = (id: number) => {
    const newBranches = [...branches];
    const resultBranches = newBranches.filter((branch) => branch.id !== id);
    setBranches(resultBranches);
    props.onSaveBranch(resultBranches);
  }

  const onBranchCancel = () => {
    setSelectedBranchName([]);
    setOpenModal(!openModal);
  }

  const changeFilterName = (value: any) => {
    setSelectedFilterFilter([]);
    if (value && value.length > 0) {
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
  }

  const changeBranchPoint = (value: any) => {
    setSelectedFilterFilter([]);
    props.onSaveBranchPoint(value);
  }

  const onFilterSave = () => {
    const newFilters = [...filters];
    if ((newFilters.length !== 0 && selectedFilterCondition.length === 0) || 
        selectedFilterName.length === 0 || 
        selectedFilterFilter.length === 0 || 
        selectedFilterValue === '') {
      return;
    }
    const tempFilter = {
      id: newFilters.length + 1, 
      data: {
        condition: selectedFilterCondition[0] ? selectedFilterCondition : [{id: '1', name: ''}], 
        name: selectedFilterName, 
        filter: selectedFilterFilter, 
        value: selectedFilterValue, 
      }
    }
    setFilters([...newFilters, tempFilter]);
    setSelectedFilterCondition([]);
    setSelectedFilterName([]);
    setSelectedFilterFilter([]);
    setSelectedFilterValue('');
    setOpenModal(!openModal);
    props.onSaveFilter([...newFilters, tempFilter]);
  }

  const deleteFilter = (id: number) => {
    const newFilters = [...filters];
    const resultFilters = newFilters.filter((filter) => filter.id !== id);
    setFilters(resultFilters);
    props.onSaveFilter(resultFilters);
  }

  const onFilterCancel = () => {
    setSelectedFilterCondition([]);
    setSelectedFilterName([]);
    setSelectedFilterFilter([]);
    setSelectedFilterValue('');
    setOpenModal(!openModal);
  }


  return (
    <div id="propwrap" className="itson">
      <div id="properties" className={`${(open || isGlobal)&&'expanded'}`}>
        <div id="close">
          <IconButton aria-label="delete" size="large" onClick={() => handleOpen()}>
            <img src={`${base_url}/assets/close.svg`} alt="NO"/>
          </IconButton>                    
        </div>
        <p id="header2">Properties</p>
        {
          isGlobal ? (
            <>
              <div id="proplist">
                <div style={{margin: 10, marginLeft: 0}}>
                  <span className="inputlabel">Name: </span>
                  {
                    (selectedBundle && bundles.length > 0) && (
                      <Select
                        className="addbranch"
                        options={bundles}
                        values={[selectedBundle]}
                        onChange={(value) => {
                          changeBundle(value);
                        }}
                        labelField="fields.name"
                        valueField="id"
                      />
                    )
                  }
                </div>
                <div style={{margin: 10, marginLeft: 0}}>
                  <span className="inputlabel">Disease: </span>
                  {
                    selectedProtocol && (
                      <input className="globalinput" type="text" value={protocolName} onChange={(event) => changeProtocol(event)}/>
                    )
                  }
                </div>
                <div className="custombutton">
                  <Button variant="text"  onClick={() => onGlobalCancel()}>cancel</Button>
                  <Button variant="text"  onClick={() => onGlobalSave()}>save</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id="proplist">
                <div style={{margin: 10, marginLeft: 0}}>
                  <span className="inputlabel">Type: </span>
                  {
                    propCard?.name === 'Branch' ? (
                      <span className="inputlabelValue">Filter</span>
                    ) : (
                      <span className="inputlabelValue">{propCard?.name}</span>
                    )
                  }
                </div>
                <div style={{margin: 10, marginLeft: 0}}>
                  <span className="inputlabel">Description: </span>
                  <span className="inputlabelValue">{propCard?.desc}</span>
                </div>
                {
                  (actionType !== '' && propCard) && (
                    <>
                      <p className="inputlabel">{propCard.templateTitle}</p>
                      {
                        propCard.hasTextInput && (
                          <TextareaAutosize
                            className="inputcomponent"
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Write custom text here..."
                            value={inputData}
                            onChange={(event) => handleTextChange(event)}
                          />
                        )
                      }
                      {
                        propCard.hasSelectInput && propCard.isMulti ? (
                          <Select
                            className="addbranch"
                            dropdownRenderer={ customDropdownRenderer }
                            values={selectedOptions}
                            options={[]}
                            multi
                            onChange={ (values) => {setSelectedOptions(values);} }
                            labelField="name"
                            valueField="id"
                          />
                        ) : (
                          <Select
                            className="addbranch"
                            dropdownRenderer={ customDropdownRenderer }
                            values={selectedOptions}
                            options={[]}
                            onChange={ (values) => {setSelectedOptions(values);} }
                            labelField="name"
                            valueField="id"
                          />
                        )
                      }                  
                      <div className="custombutton">
                        <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                        <Button variant="text" onClick={() => onSave()}>save</Button>
                      </div>
                      { 
                        (actionType === 'Elicit' && selectedOptions && selectedOptions[0]) && (
                          <div>
                            <p className="header2">Preview</p>
                            <div className="previewwrapper">
                              
                              <PathwayThemeProvider>
                                <DbProvider db={collectedDb}>
                                  <Suspense fallback={null}>
                                    <NoteEditor findingIds={selectedOptions.map((x) => x.id)} onButtonStateChange={() => {}}/>
                                  </Suspense>
                              </DbProvider>
                              </PathwayThemeProvider>
                            </div>
                          </div> 
                        )
                      }
                      { 
                        (actionType === 'Use' && selectedOptions && selectedOptions[0]) && (
                          <div>
                            <p className="header2">Preview</p>
                            <div className="previewwrapper">
                              <PathwayThemeProvider>
                                <DbProvider db={collectedDb}>
                                  <Calculator calculatorId={selectedOptions[0].id} onStateChange={() => {}}/>
                              </DbProvider>
                              </PathwayThemeProvider>
                            </div>
                          </div> 
                        )
                      }
                    </>
                  )
                }
                {
                  structureType === 'Branch' ? (
                    <>
                      <div>
                        <p className="inputlabel">Select a branch point: </p>
                        <Select
                          className="addfilterselect"
                          style={{width: '400px'}}
                          options={Filter_Names}
                          values={selectedBranchPoint}
                          onChange={(value) => {
                            setSelectedBranchPoint(value);
                            changeBranchPoint(value);
                            changeFilterName(value);
                          }}
                          labelField="name"
                          valueField="id"
                        />
                      </div>
                      <p className="inputlabel">Define branches: </p>                  
                      {
                        branches.length > 0 && (
                          branches.map((branch) => {
                            return (
                              <BranchList key={branch.id} data={branch} deleteBranch={deleteBranch} selectableFilter={selectableFilters}/>
                            )
                          })
                        )
                      }
                      <div className="condition">
                        <Button 
                          className="buttonaddfilter"
                          variant="outlined"
                          onClick={openNew}>
                          <img src={`${base_url}/assets/plus_circle.svg`} alt="NO"/>
                          Add a new condition
                        </Button>
                      </div>
                      {
                        openModal && (
                          <>
                            <div className="selectgroup">
                              <Select
                                className="addfilterselect"
                                style={{width: '200px'}}
                                options={selectableFilters}
                                values={selectedFilterFilter}
                                onChange={(value) => {
                                  setSelectedFilterFilter(value);
                                }}
                                labelField="name"
                                valueField="id"
                              />
                              <input className="filterinput" type="text" style={{width: '190px'}} onChange={(event) => handleChange(event)}/>                    
                            </div>
                            <div className="custombutton">
                              <Button variant="text" onClick={() => onBranchCancel()}>cancel</Button>
                              <Button variant="text" onClick={() => onBranchSave()}>save</Button>
                            </div>
                          </>
                        )
                      }
                    </>
                  ) : structureType === 'Include' && (
                    <>
                      <p className="inputlabel">Add one or more conditions: </p>
                      {
                        filters.length > 0 && (
                          filters.map((filter) => {
                            return (
                              <FilterList key={filter.id} data={filter} deleteFilter={deleteFilter}/>
                            )
                          })
                        )
                      }
                      <div className="condition">
                        <Button 
                          className="buttonaddfilter"
                          variant="outlined"
                          onClick={openNew}>
                          <img src={`${base_url}/assets/plus_circle.svg`} alt="NO"/>
                          Add a new condition
                        </Button>
                      </div>
                      {
                        openModal && (
                          <>
                            <div className="selectgroup">
                              {
                                filters.length === 0 ? (
                                  <span className="addfilterstatic">Where</span>
                                ) : (
                                  <Select
                                    className="addfilterselect"
                                    style={{width: '73px'}}
                                    options={Filter_Conditions}
                                    values={selectedFilterCondition}
                                    onChange={(value) => {
                                      setSelectedFilterCondition(value);
                                    }}
                                    labelField="name"
                                    valueField="id"
                                  />
                                )
                              }
                              <Select
                                className="addfilterselect"
                                style={{width: '112px'}}
                                options={Filter_Names}
                                values={selectedFilterName}
                                onChange={(value) => {
                                  setSelectedFilterName(value);
                                  changeFilterName(value);
                                }}
                                labelField="name"
                                valueField="id"
                              />
                              <Select
                                className="addfilterselect"
                                style={{width: '172px'}}
                                options={selectableFilters}
                                values={selectedFilterFilter}
                                onChange={(value) => {
                                  setSelectedFilterFilter(value);
                                }}
                                labelField="name"
                                valueField="id"
                              />
                              <input className="filterinput" type="text" onChange={(event) => handleChange(event)}/>                    
                            </div>
                            <div className="custombutton">
                              <Button variant="text" onClick={() => onFilterCancel()}>cancel</Button>
                              <Button variant="text" onClick={() => onFilterSave()}>save</Button>
                            </div>
                          </>
                        )
                      }
                    </>
                  )
                }
              </div>  
              <div className="removeblockwrapper">
                <p className="header2">Delete this block</p>
                <div id="removeblock">
                  <Button variant="text" onClick={() => deleteBlock()}>Delete block</Button>
                </div>   
              </div>
            </>
          )
        }
        
      </div>
    </div>
  )
}

export default PropWrap;

const Item = styled.div`
  display: flex;
  padding: 0 10px;
  align-items: center;
  cursor: pointer;
  width: 480px;
  height: 40px;
  display: inline-block;
  white-space: nowrap;
  
  &:hover {
    background: #f2f2f2;
  }  
`;
  // ${({ disabled:boolean }) => disabled && 'text-decoration: line-through;'}
