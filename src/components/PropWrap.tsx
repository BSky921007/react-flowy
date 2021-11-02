import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {PropWrapProps} from '../types';

const PropWrap = (props: PropWrapProps) => {
  console.log(props);
  const [open, setOpen] = useState(props.data);
  const [isCustom, setIsCustom] = useState(false);
  const [propCard, setPropCard] = useState(props.propData);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    setOpen(props.data);
    if (!props.propData) {
      setOpen(false);
    } else if (props.propData.name === 'Custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
    }
    console.log(props.propData);
    setPropCard(props.propData);
    setInputData(props.propData.desc2);
  }, [props]);

  const handleOpen = () => {
    setOpen(false);
    props.onClick();
	}

  const deleteBlock = () => {
    props.onDelete();
  }

  const onSave = () => {
    console.log(inputData);
    props.onSave(inputData);
  }

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

    setInputData(event.target.value);
  }

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
              isCustom ? (
                <>
                  <p className="inputlabel">Action Custom</p>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Write custom text here..."
                    value={inputData}
                    onChange={(event) => onInputChange(event)}
                    style={{ width: '287px' }}
                  />
                  <div className="custombutton">
                    <Button variant="text">cancel</Button>
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