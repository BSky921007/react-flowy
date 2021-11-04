import React, { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {PropWrapProps} from '../types';
import Use_Names from '../data/calculators.json';
import Link_Names from '../data/pathways.json';
import Elicit_Names from '../data/findings.json';
import { Prescribe_Names, Order_Names, getStyles, MenuProps, arrayToString } from '../Globals';

const PropWrap = (props: PropWrapProps) => {
  const theme = useTheme();
  const [selectedName, setSelectedName] = React.useState<string[]>([]);
  const [useNames, setUseNames] = useState<any>();
  const [open, setOpen] = useState(props.data);
  const [isElicit, setIsElicit] = useState(false);
  const [isPrescribe, setIsPrescribe] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isUse, setIsUse] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
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
    if (props.propData.name === 'Custom')       setIsCustom(true);
    else                                        setIsCustom(false);
    setPropCard(props.propData);
    setInputData(props.propData.desc2);
    if (props.propData.desc2.startsWith('$')) {
      setSelectedName([]);
    } else {
      setSelectedName(typeof props.propData.desc2 === 'string' ? props.propData.desc2.split(',') : props.propData.desc2);
    }    
  }, [props]);

  const handleOpen = () => {
    setOpen(false);
	}

  const deleteBlock = () => {
    props.onDelete();
  }

  const onSave = () => {
    // console.log(inputData);
    props.onSave(inputData);
  }

  const onCancel = () => {
    setInputData(props.propData?.desc2);
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    // console.log(event.target.value);
    setInputData(event.target.value);
  };

  const handleMultiChange = (event: SelectChangeEvent<typeof selectedName>) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    let tempString = arrayToString(value);
    // console.log(tempString);
    setSelectedName(typeof value === 'string' ? value.split(',') : value);
    setInputData(tempString);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(event.target.value);
    setInputData(event.target.value);
  }

  // console.log(selectedName);

  return (
    <div id="propwrap" className="itson">
      <div id="properties" className={`${open&&'expanded'}`}>
        <div id="close">
          <IconButton aria-label="delete" size="large" onClick={() => handleOpen()}>
            <img src="assets/close.svg" alt="NO"/>
          </IconButton>                    
        </div>
        <p id="header2">Properties</p>
          <div id="proplist">
            <p className="inputlabel">Block Type</p>
            <div className="dropme">
              {propCard?.name}
            </div>
            <p className="inputlabel">Description</p>
            <div className="dropme">
              {propCard?.desc}
            </div>
            {
              isElicit ? (
                <>
                  <p className="inputlabel">Action Custom</p>
                  <Select
                    className="inputcomponent"
                    labelId="demo-multiple-name-label"
                    multiple
                    value={selectedName}
                    onChange={handleMultiChange}
                    MenuProps={MenuProps}
                  >
                    {Elicit_Names.map((name) => (
                      <MenuItem
                        key={name.finding_id}
                        value={name.name}
                        style={getStyles(name.name, selectedName, theme)}
                      >
                        {name.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isPrescribe ? (
                <>
                  <p className="inputlabel">Action Custom</p>
                  <Select
                    className="inputcomponent"
                    labelId="demo-multiple-name-label"
                    multiple
                    value={selectedName}
                    onChange={handleMultiChange}
                    MenuProps={MenuProps}
                  >
                    {Prescribe_Names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isOrder ? (
                <>
                  <p className="inputlabel">Action Custom</p>
                  <Select
                    className="inputcomponent"
                    labelId="demo-multiple-name-label"
                    multiple
                    value={selectedName}
                    onChange={handleMultiChange}
                    MenuProps={MenuProps}
                  >
                    {Order_Names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isApply ? (
                <>
                  <p className="inputlabel">Action Custom</p>
                  <Select
                    className="inputcomponent"
                    value={inputData}
                    onChange={handleSelectChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {/* {Apply_Names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    ))} */}
                  </Select>
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isLink ? (
                <>
                  <p className="inputlabel">Action Custom</p>
                  <Select
                    className="inputcomponent"
                    value={inputData}
                    onChange={handleSelectChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {Link_Names.map((name) => (
                      <MenuItem
                        key={name.pathway_id}
                        value={name.name}
                      >
                        {name.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isUse ? (
                <>
                  <p className="inputlabel">Action Custom</p>
                  <Select
                    className="inputcomponent"
                    value={inputData}
                    onChange={handleSelectChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {Use_Names.map((name) => (
                      <MenuItem
                        key={name.calculator_id}
                        value={name.name}
                      >
                        {name.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className="custombutton">
                    <Button variant="text" onClick={() => onCancel()}>cancel</Button>
                    <Button variant="text" onClick={() => onSave()}>save</Button>
                  </div>
                </>
              ) : isCustom ? (
                <>
                  <p className="inputlabel">Action Custom</p>
                  <TextareaAutosize
                    className="inputcomponent"
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Write custom text here..."
                    value={inputData}
                    onChange={(event) => handleTextChange(event)}
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
                    {propCard?.desc1}{propCard?.desc2}{propCard?.desc3}{propCard?.desc4}
                  </div>
                </>
              )
            }
          </div>
          <div id="divisionthing"></div>
          <div id="removeblock">
            <Button variant="text" onClick={() => deleteBlock()}>Delete Blocks</Button>
          </div>   
      </div>
    </div>
  )
}

export default PropWrap;