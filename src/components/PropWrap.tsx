import React, { useEffect, useState, useCallback, CSSProperties, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-dropdown-select';
import styled from '@emotion/styled';
import { List, AutoSizer, ListProps } from 'react-virtualized';
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
import Period_Names from '../data/periods.json';
import { base_url, Filter_Conditions, Filter_Names, Filter_Age_Filters, Filter_Sex_Filters, Filter_PastMedicalHistory_Filters, Filter_LastFollowUp_Filters } from '../Globals';
import { PropWrapProps, SelectTypes, BranchTypes, BranchData, BranchProps, FilterProps, BundleType, ProtocolType } from '../types';

import { ThemeProvider, CSSReset, Grid, Link, Input, Button, Box, FormControl, Icon,IconButton, InputGroup, Image, Text, Heading } from '@chakra-ui/react'
import theme from '../styles/theme'

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
  const navigate = useNavigate();

  const { bundles, protocols, selBundle, selProtocol, selableProtocols } = props;

  const [selectedOptions, setSelectedOptions] = useState<SelectTypes[]>([]);
  const [actionType, setActionType] = useState<string>('');
  const [structureType, setStructureType] = useState<string>('');
  const [actions, setActions] = useState<SelectTypes[]>([]);
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
  const [isHeader, setIsHeader] = useState(props.isHeader);
  const [selectedBundle, setSelectedBundle] = useState<BundleType>();
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType>();
  const [selectedHeaderBundle, setSelectedHeaderBundle] = useState<BundleType>();
  const [selectableProtocols, setSelectableProtocols] = useState<ProtocolType[]>(selableProtocols);
  const [selectedHeaderProtocol, setSelectedHeaderProtocol] = useState<ProtocolType>();
  const [openModal, setOpenModal] = useState(false);
  const [propCard, setPropCard] = useState(props.propData);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    setIsGlobal(props.isGlobal);
    setIsHeader(props.isHeader);
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
    setSelectedHeaderBundle(selBundle ? selBundle : bundles[0]);
  }, [bundles, selBundle, protocols, selProtocol]);

  useEffect(() => {
    setSelectedProtocol(selProtocol);
    setSelectedHeaderProtocol(selProtocol);
  }, [selProtocol]);

  useEffect(() => {
    setSelectableProtocols(selableProtocols);
  }, [selableProtocols])

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
              )}
            />
          )
        }}
      </AutoSizer>
    );
  }, [actions]);

  const handleOpen = () => {
    setOpen(false);
    setIsGlobal(false);
    setIsHeader(false);
    props.onCloseProperties();
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

  const onGlobalSave = () => {
    if (selectedProtocol && selectedBundle) {
      if (selectedProtocol.fields.bundles.includes(selectedBundle.id) || 
          selectedBundle.fields.protocols.includes(selectedProtocol.id)) {
        props.onGlobalSave(selectedBundle, selectedProtocol, false);
        return;
      }
      
      const tempProtocol = selectedProtocol;            
      if (!(selectedProtocol.fields.bundles)) {
        tempProtocol.fields.bundles = [];
      }
      tempProtocol.fields.bundles.push(selectedBundle.id);

      const tempBundle = selectedBundle;
      if (!(selectedBundle.fields.protocols)) {
        tempBundle.fields.protocols = [];
      }
      tempBundle.fields.protocols.push(selectedProtocol.id);

      props.onGlobalSave(tempBundle, tempProtocol, true);
    }
  }

  const onHeaderOpen = () => {
    if (selectedHeaderProtocol) {
      props.onHeaderOpen(selectedHeaderBundle, selectedHeaderProtocol);
      const targetUrl = `/builder/${selectedHeaderProtocol.id}`;
      navigate(targetUrl);
    }
  }

  const onGlobalCancel = () => {
    setSelectedBundle(selBundle ? selBundle : bundles[0]);
    setSelectedProtocol(selProtocol ? selProtocol : protocols[0]);
    setSelectedHeaderBundle(selBundle ? selBundle : bundles[0]);
    setSelectedHeaderProtocol(selProtocol ? selProtocol : protocols[0]);
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(event.target.value);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilterValue(event.target.value);
  }

  const onBranchSave = () => {
    const newBranches: BranchProps[] = [...branches];

    let temp = newBranches.length === 0 ? 0 : newBranches[newBranches.length-1].id;
    const tempBranch: BranchProps = {
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

  const changeHeaderBundle = (value: BundleType) => {
    setSelectedHeaderBundle(value);
    const tempProtocols: ProtocolType[] = [];
    if (protocols.length > 0 && value.fields.protocols) {
      for (let i = 0; i < value.fields.protocols.length; i ++) {
        const tempProtocol = protocols.find(({ id }) => id === value.fields.protocols[i]);
        if (tempProtocol)
          tempProtocols.push(tempProtocol);
      }

      setSelectableProtocols(tempProtocols);
      setSelectedHeaderProtocol(tempProtocols[0]);
    }
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
    <ThemeProvider theme={theme}>
      <CSSReset/>
      <div id="propwrap" className="itson">
        <div id="properties" className={`${(open || isGlobal || isHeader) && 'expanded'}`}>
          <div id="close">
            <IconButton aria-label="delete" size="sm" onClick={() => handleOpen()}>
              <img src={`${base_url}/assets/close.svg`} alt="NO"/>
            </IconButton>                    
          </div>
          <p id="header2">Properties</p>
          {
            isHeader ? (
              <>
                <div id="proplist">
                  <div style={{margin: '10px 0px'}}>
                    <span className="inputlabel">Bundle: </span>
                    {
                      (selectedHeaderBundle && bundles.length > 0) && (
                        <Select
                          className="addbranch"
                          options={bundles}
                          values={[selectedHeaderBundle]}
                          onChange={(value) => {
                            changeHeaderBundle(value[0]);
                          }}
                          labelField="fields.name"
                          valueField="id"
                        />
                      )
                    }
                  </div>
                  <div style={{margin: '10px 0px'}}>
                    <span className="inputlabel">Protocol: </span>
                    {
                      (selectedHeaderProtocol && selectableProtocols.length > 0) && (
                        <Select
                          className="addbranch"
                          options={selectableProtocols}
                          values={[selectedHeaderProtocol]}
                          onChange={(value) => {
                            setSelectedHeaderProtocol(value[0]);
                          }}
                          labelField="fields.name"
                          valueField="id"
                        />
                      )
                    }
                  </div>
                  <Box display="flex" float="right" mt="4">
                    <Button colorScheme="gray" onClick={() => onGlobalCancel()}>Cancel</Button>
                    <Button colorScheme="blue" ml="4" onClick={() => onHeaderOpen()}>Open</Button>
                  </Box>
                </div>
              </>
            ) : isGlobal ? (
              <>
                <div id="proplist">
                  <div style={{margin: '10px 0px'}}>
                    <span className="inputlabel">Bundle: </span>
                    {
                      (selectedBundle && bundles.length > 0) && (
                        <Select
                          className="addbranch"
                          options={bundles}
                          values={[selectedBundle]}
                          onChange={(value) => {
                            setSelectedBundle(value[0]);
                          }}
                          labelField="fields.name"
                          valueField="id"
                        />
                      )
                    }
                  </div>
                  <div style={{margin: '10px 0px'}}>
                    <span className="inputlabel">Name: </span>
                    {
                      selectedProtocol && (
                        <p className="globalinput">{selectedProtocol.fields.name}</p>
                      )
                    }
                  </div>
                  <Box display="flex" float="right" mt="4">
                    <Button colorScheme="gray" onClick={() => onGlobalCancel()}>Cancel</Button>
                    <Button colorScheme="blue" ml="4" onClick={() => onGlobalSave()}>Save</Button>
                  </Box>
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
                        <Box display="flex" float="right" mt="4">
                          <Button colorScheme="gray" onClick={() => onCancel()}>Cancel</Button>
                          <Button colorScheme="blue" ml="4" onClick={() => onSave()}>Save</Button>
                        </Box>
                        { 
                          (actionType === 'Elicit' && selectedOptions && selectedOptions[0]) && (
                            <Box mt="24">
                              <Heading as="h2" size="md">Preview</Heading>
                              <Box class="previewwrapper" mt="4">                                
                                <PathwayThemeProvider>
                                  <DbProvider db={collectedDb}>
                                    <Suspense fallback={null}>
                                      <NoteEditor findingIds={selectedOptions.map((x) => x.id)} onButtonStateChange={() => {}}/>
                                    </Suspense>
                                </DbProvider>
                                </PathwayThemeProvider>
                              </Box>
                            </Box> 
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
                        <Box mt="4">
                          <Text className="inputlabel">Select a branch point: </Text>
                          <Select
                            className="addfilterselect"
                            border-radius="6px"
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
                        </Box>
                        <Box mt="4">
                        <Text className="inputlabel">Define branches: </Text>                  
                        {
                          branches.length > 0 && (
                            branches.map((branch) => {
                              return (
                                <BranchList key={branch.id} data={branch} deleteBranch={deleteBranch} selectableFilter={selectableFilters}/>
                              )
                            })
                          )
                        }
                        </Box>
                        <Box mt="4">
                          <Button
                            style={{width: '100%'}}
                            colorScheme="blue" 
                            onClick={openNew}>
                            <Image src={`${base_url}/assets/plus_circle.svg`} alt="NO"/>
                            <Text ml="4">Add a new condition</Text>
                          </Button>
                        </Box>
                        {
                          openModal && (
                            <div className="addmodal">
                              <Box display="flex">
                                <Select
                                  style={{width: '175px'}}
                                  options={selectableFilters}
                                  values={selectedFilterFilter}
                                  onChange={(value) => {
                                    setSelectedFilterFilter(value);
                                  }}
                                  labelField="name"
                                  valueField="id"
                                />
                                <input type="text" className="branchinput" onChange={(event) => handleChange(event)}/>                    
                              </Box>
                              <Box display="flex" float="right" mt="4">
                                <Button colorScheme="blue" onClick={() => onBranchCancel()}>Cancel</Button>
                                <Button colorScheme="gray" onClick={() => onBranchSave()}>Save</Button>
                              </Box>
                            </div>
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
                        <Box mt="4">
                          <Button
                            style={{width: '100%'}}
                            colorScheme="blue" 
                            onClick={openNew}>
                            <Image src={`${base_url}/assets/plus_circle.svg`} alt="NO"/>
                            <Text ml="4">Add a new condition</Text>
                          </Button>
                        </Box>
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
                                      style={{width: '53px'}}
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
                                  style={{width: '125px'}}
                                  options={selectableFilters}
                                  values={selectedFilterFilter}
                                  onChange={(value) => {
                                    setSelectedFilterFilter(value);
                                  }}
                                  labelField="name"
                                  valueField="id"
                                />
                                <input type="text" onChange={(event) => handleChange(event)}/>                    
                              </div>
                              <Box display="flex" float="right" mt="4">
                                <Button colorScheme="gray" onClick={() => onFilterCancel()}>Cancel</Button>
                                <Button colorScheme="blue" ml="4" onClick={() => onFilterSave()}>Save</Button>
                              </Box>
                            </>
                          )
                        }
                      </>
                    )
                  }
                </div>  
                <Box className="removeblockwrapper">
                  <Text className="header2">Delete this block</Text>
                  <Box id="removeblock" mt="4">
                    <Button variant="text" onClick={() => deleteBlock()}>Delete block</Button>
                  </Box>   
                </Box>
              </>
            )
          }
          
        </div>
      </div>
    </ThemeProvider>
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
  // ${({ disabled }: {disabled: boolean}) => disabled && 'text-decoration: line-through;'}
