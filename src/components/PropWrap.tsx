import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import {PropWrapProps} from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PropWrap = (props: PropWrapProps) => {
    const [open, setOpen] = React.useState(props.data);
    const [value, setValue] = React.useState(0);
  
    const handleOpen = () => {
      setOpen(false);
      props.onClick();
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

    return (
        <div id="propwrap" className="itson">
            <div id="properties" className={`${props.data&&'expanded'}`}>
                <div id="close">
                    <IconButton aria-label="delete" size="large" onClick={() => handleOpen()}>
                        <img src="assets/close.svg" alt="NO"/>
                    </IconButton>                    
                </div>
                <p id="header2">Properties</p>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="BlockType" {...a11yProps(0)} />
                    <Tab label="Description" {...a11yProps(1)} />
                    <Tab label="TextTemplate" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div id="proplist">
                        <p className="inputlabel">Select database</p>
                        <div className="dropme">Database 1 <img src="assets/dropdown.svg" alt="NO"/></div>
                        <p className="inputlabel">Check properties</p>
                        <div className="dropme">All<img src="assets/dropdown.svg" alt="NO"/></div>
                        <div className="checkus"><img src="assets/checkon.svg" alt="NO"/><p>Log on successful performance</p></div>
                        <div className="checkus"><img src="assets/checkoff.svg" alt="NO"/><p>Give priority to this block</p></div>
                    </div>
                    <div id="divisionthing"></div>
                    <div id="removeblock">Delete blocks</div>                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div id="proplist">
                        <p className="inputlabel">Select database</p>
                        <div className="dropme">Database 1 <img src="assets/dropdown.svg" alt="NO"/></div>
                        <p className="inputlabel">Check properties</p>
                        <div className="dropme">All<img src="assets/dropdown.svg" alt="NO"/></div>
                        <div className="checkus"><img src="assets/checkon.svg" alt="NO"/><p>Log on successful performance</p></div>
                        <div className="checkus"><img src="assets/checkoff.svg" alt="NO"/><p>Give priority to this block</p></div>
                    </div>
                    <div id="divisionthing"></div>
                    <div id="removeblock">Delete blocks</div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div id="proplist">
                        <p className="inputlabel">Select database</p>
                        <div className="dropme">Database 1 <img src="assets/dropdown.svg" alt="NO"/></div>
                        <p className="inputlabel">Check properties</p>
                        <div className="dropme">All<img src="assets/dropdown.svg" alt="NO"/></div>
                        <div className="checkus"><img src="assets/checkon.svg" alt="NO"/><p>Log on successful performance</p></div>
                        <div className="checkus"><img src="assets/checkoff.svg" alt="NO"/><p>Give priority to this block</p></div>
                    </div>
                    <div id="divisionthing"></div>
                    <div id="removeblock">Delete blocks</div>
                </TabPanel>
            </div>
        </div>
    )
}

export default PropWrap;