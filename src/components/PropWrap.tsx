import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from 'react-dropdown-select';
import BranchList from './BranchList';
import Link_Names from '../data/pathways.json';
import Use_Names from '../data/calculators.json';
import Schedule_Names from '../data/specialties.json';
import Apply_Names from '../data/keypoints.json';
import Record_Names from '../data/diseases.json';
import Elicit_Names from '../data/findings.json';
import Prescribe_Names from '../data/dosages.json';
import Order_Names from '../data/tests.json';
import Criteria_Names from '../data/criterias.json';
import Reference_Names from '../data/references.json';
import { base_url } from '../Globals';
import { PropWrapProps, SelectTypes, BranchData, BranchProps } from '../types';

import {
  DbProvider,
  Database,
  Calculator,
  Pathway,
  Drug,
  PathwayThemeProvider,
} from '@pathwaymd/pathway-ui2'

import untypedCollectedDb from '../data/parsed.test.json'

const collectedDb = (untypedCollectedDb.objects as unknown) as Database

const PropWrap = (props: PropWrapProps) => {
  const [selectedName, setSelectedName] = useState<SelectTypes[]>([]);
  const [selectedBranchName, setSelectedBranchName] = useState<BranchData[]>([]);
  const [branches, setBranches] = useState<BranchProps[]>([]);
  const [linkNames, setLinkNames] = useState<SelectTypes[]>(Link_Names.slice(0, 100));
  const [useNames, setUseNames] = useState<SelectTypes[]>(Use_Names.slice(0, 100));
  const [scheduleNames, setScheduleNames] = useState<SelectTypes[]>(Schedule_Names.slice(0, 100));
  const [applyNames, setApplyNames] = useState<SelectTypes[]>(Apply_Names.slice(0, 100));
  const [recordNames, setRecordNames] = useState<SelectTypes[]>(Record_Names.slice(0, 100));
  const [elicitNames, setElicitNames] = useState<SelectTypes[]>(Elicit_Names.slice(0, 100));
  const [prescribeNames, setPrescribeNames] = useState<SelectTypes[]>(Prescribe_Names.slice(0, 100));
  const [orderNames, setOrderNames] = useState<SelectTypes[]>(Order_Names.slice(0, 100));
  const [referenceNames, setReferenceNames] = useState<SelectTypes[]>(Reference_Names.slice(0, 100));
  const [criteriaNames, setCriteriaNames] = useState<BranchData[]>(Criteria_Names);

  const [open, setOpen] = useState(props.data);
  const [openModal, setOpenModal] = useState(false);
  const [isElicit, setIsElicit] = useState(false);
  const [isPrescribe, setIsPrescribe] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isUse, setIsUse] = useState(false);
  const [isBranch, setIsBranch] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [propCard, setPropCard] = useState(props.propData);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    setOpen(props.data);
    if (!props.propData) {
      setOpen(false);
      return;
    } 
    if (props.propData.name === 'Elicit')       setIsElicit(true);
    else                                        setIsElicit(false);
    if (props.propData.name === 'Prescribe')    setIsPrescribe(true);
    else                                        setIsPrescribe(false);
    if (props.propData.name === 'Order')        setIsOrder(true);
    else                                        setIsOrder(false);
    if (props.propData.name === 'Apply')        setIsApply(true);
    else                                        setIsApply(false);
    if (props.propData.name === 'Link')         setIsLink(true);
    else                                        setIsLink(false);
    if (props.propData.name === 'Use')          setIsUse(true);
    else                                        setIsUse(false);
    if (props.propData.name === 'Schedule')     setIsSchedule(true);
    else                                        setIsSchedule(false);
    if (props.propData.name === 'Record')       setIsRecord(true);
    else                                        setIsRecord(false);
    if (props.propData.name === 'Branch')       setIsBranch(true);
    else                                        setIsBranch(false);
    if (props.propData.name === 'Custom')       setIsCustom(true);
    else                                        setIsCustom(false);
    setPropCard(props.propData);
    setInputData(props.propData.template);
    setSelectedName(props.propData.selectedOptions);
    setBranches(props.propData.selectedBranches);
    setSelectedBranchName([]);
  }, [props]);

  const handleOpen = () => {
    setOpen(false);
	}

  const openNewBranch = () => {
    setOpenModal(!openModal);
  }

  const deleteBlock = () => {
    props.onDelete();
  }

  const onSave = () => {
    props.onSave(selectedName, inputData);
  }

  const onCancel = () => {
    setInputData(props.propData.template);
    setSelectedName(props.propData.selectedOptions);
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(event.target.value);
  }

  const onBranchSave = () => {
    const newBranches = [...branches];
    const tempBranch = {
      id: newBranches.length + 1, 
      data: selectedBranchName[0]
    }
    setBranches([...newBranches, tempBranch]);
    setSelectedBranchName([]);
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

  const handleStart = (action: BranchProps) => {
    console.log('prop wrap on drag start');
    console.log(action);
  }

  return (
    <div id="propwrap" className="itson">
      <div id="properties" className={`${open&&'expanded'}`}>
        <div id="close">
          <IconButton aria-label="delete" size="large" onClick={() => handleOpen()}>
            <img src={`${base_url}/assets/close.svg`} alt="NO"/>
          </IconButton>                    
        </div>
        <p id="header2">Properties</p>
          <div id="proplist">
            <div style={{margin: 10, marginLeft: 0}}>
              <span className="inputlabel">Type: </span>
              <span className="inputlabelValue">{propCard?.name}</span>
            </div>
            <div style={{margin: 10, marginLeft: 0}}>
            <span className="inputlabel">Description: </span>
            <span className="inputlabelValue">{propCard?.desc}</span>
            </div>
            {
              isElicit ? (
                <>
                  <p className="inputlabel">Select one or more findings:</p>
                  <Select
                    multi
                    options={elicitNames}
                    values={selectedName}
                    onChange={(values) => {
                      setSelectedName(values);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isSchedule ? (
                <>
                  <p className="inputlabel">Select a specialty:</p>
                  <Select
                    options={scheduleNames}
                    values={selectedName}
                    onChange={(value) => {
                      setSelectedName(value);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isPrescribe ? (
                <>
                  <p className="inputlabel">Select one or more dosages:</p>
                  <Select
                    multi
                    options={prescribeNames}
                    values={selectedName}
                    onChange={(values) => {
                      setSelectedName(values);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                  <div>
                  <PathwayThemeProvider>
                    <DbProvider db={collectedDb}>
                      <Drug drugId="recsIaI9dkRGGpNKr"/>
                    </DbProvider>
                  </PathwayThemeProvider>  
                  </div>
                </>
              ) : isOrder ? (
                <>
                  <p className="inputlabel">Select one or more tests:</p>
                  <Select
                    multi
                    options={orderNames}
                    values={selectedName}
                    onChange={(values) => {
                      setSelectedName(values);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isApply ? (
                <>
                  <p className="inputlabel">Select a keypoint:</p>
                  <Select
                    options={applyNames}
                    values={selectedName}
                    onChange={(value) => {
                      setSelectedName(value);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isLink ? (
                <>
                  <p className="inputlabel">Select a pathway:</p>
                  <Select
                    options={linkNames}
                    values={selectedName}
                    onChange={(value) => {
                      setSelectedName(value);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                  <p className="header2">Preview</p>
                  <div className="previewwrapper">
                  <PathwayThemeProvider>
                    <DbProvider db={collectedDb}>
                      <Pathway pathwayId="recAP0OHwkL3dhAso"/>
                    </DbProvider>
                  </PathwayThemeProvider>  
                  </div>
                </>
              ) : isUse ? (
                <>
                  <p className="inputlabel">Select a calculator:</p>
                  <Select
                    options={useNames}
                    values={selectedName}
                    onChange={(value) => {
                      setSelectedName(value);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                  { (selectedName && selectedName[0]) ? (
                    <div>
                      <p className="header2">Preview</p>
                      <div className="previewwrapper">
                        <PathwayThemeProvider>
                          <DbProvider db={collectedDb}>
                            <Calculator calculatorId={selectedName[0].id} onStateChange={() => {}}/>
                        </DbProvider>
                        </PathwayThemeProvider>
                      </div>
                    </div> ) : (<div></div>) 
                  }
                </>
              ) : isRecord ? (
                <>
                  <p className="inputlabel">Select one or more diseases:</p>
                  <Select
                    multi
                    options={recordNames}
                    values={selectedName}
                    onChange={(values) => {
                      setSelectedName(values);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isBranch ? (
                <>
                  <p className="inputlabel">Add a branch:</p>
                  {
                    branches.length > 0 && (
                      branches.map((branch) => {
                        return (
                          <BranchList key={branch.id} data={branch} deleteBranch={deleteBranch}/>
                        )
                      })
                    )
                  }
                  <div className="branch">
                    <Button 
                      variant="contained"
                      onClick={openNewBranch}>
                      <img src={`${base_url}/assets/plus_circle.svg`} alt="NO"/>
                      New branch
                    </Button>
                  </div>
                  {
                    openModal && (
                      <>
                        <Select
                          options={criteriaNames}
                          values={selectedBranchName}
                          onChange={(value) => {
                            setSelectedBranchName(value);
                          }}
                          labelField="name"
                          valueField="criteria_id"
                        />
                        <div className="custombutton">
                          <Button variant="text" onClick={() => onBranchCancel()}>cancel</Button>
                          <Button variant="text" onClick={() => onBranchSave()}>save</Button>
                        </div>
                      </>
                    )
                  }
                </>
              ) : isCustom ? (
                <>
                  <p className="inputlabel">Select one or more references:</p>
                  <TextareaAutosize
                    className="inputcomponent"
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Write custom text here..."
                    value={inputData}
                    onChange={(event) => handleTextChange(event)}
                  />
                  <Select
                    options={referenceNames}
                    values={selectedName}
                    onChange={(value) => {
                      setSelectedName(value);
                    }}
                    labelField="name"
                    valueField="id"
                  />
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="inputlabel">Template</p>
                  <div className="dropme">
                    {propCard?.template}
                  </div>
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
      </div>
    </div>
  )
}

export default PropWrap;