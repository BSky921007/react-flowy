import React, { useEffect, useState, useCallback, CSSProperties } from 'react';
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
import { base_url, Filter_Conditions, Filter_Names, Filter_Age_Filters, Filter_Sex_Filters, Filter_PastMedicalHistory_Filters, Filter_LastFollowUp_Filters } from '../Globals';
import { GlobalWrapProps, SelectTypes, BranchTypes, BranchData, BranchProps, FilterProps } from '../types';

import {
  DbProvider,
  Database,
  Calculator,
  Pathway,
  Drug,
  NoteEditor,
  PathwayThemeProvider,
} from '@pathwaymd/pathway-ui2'

import untypedCollectedDb from '../data/parsed.test.json'
import { View, ViewComponent } from 'react-native';

const collectedDb = (untypedCollectedDb.objects as unknown) as Database;

const GlobalWrap = (props: GlobalWrapProps) => {  
	console.log(props.data);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
	}
	
	const handleOpen = () => {
    // setOpen(false);
	}

  return (
    <div id="globalwrap" className="itson">
      <div id="properties" className={`${props.data&&'expanded'}`}>
        <div id="close">
          <IconButton aria-label="delete" size="large" onClick={() => handleOpen()}>
            <img src={`${base_url}/assets/close.svg`} alt="NO"/>
          </IconButton>                    
        </div>
        <p id="header2">Properties</p>
				<div id="proplist">
					<div style={{margin: 10, marginLeft: 0}}>
						<span className="inputlabel">Name: </span>
						<input className="globalinput" type="text" value={props.title} onChange={(event) => handleChange(event)}/>
					</div>
					<div style={{margin: 10, marginLeft: 0}}>
						<span className="inputlabel">Disease: </span>
						<input className="globalinput" type="text" value={props.subTitle} />
					</div>
				</div>
				<div className="custombutton">
					<Button variant="text" >cancel</Button>
					<Button variant="text" >save</Button>
				</div>
      </div>
    </div>
  )
}

export default GlobalWrap;
