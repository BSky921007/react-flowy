import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'

import { base_url } from '../Globals'
import { PreviewModalProps } from '../types';
import PathwayWrapper from './PathwayWrapper'

const PreviewModal = (props: PreviewModalProps) => {
  
  const [pathwayId, setPathwayId] = useState(props.data);
  const { onClose } = props
  
  return (
    <div id="modal">
      <div id="closemodal">
        <img src={`${base_url}/assets/close.svg`} alt="X" onClick={ onClose}/>
      </div>
      <div id="pathway">
        <div id ="pathwaytitle">
          Dyslipidemia - Statins for primary prevention
        </div>
        <PathwayWrapper pathwayId="fake for demo" />
      </div>
    </div>
  )
}

export default PreviewModal;