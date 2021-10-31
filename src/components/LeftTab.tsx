import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LeftCard from './LeftCard';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {CardList_Actions, CardList_Triggers, CardList_Structure} from '../Globals';

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

export default function LeftTab() {
	const [open, setOpen] = React.useState(true);
  	const [value, setValue] = React.useState(0);
	
	const handleOpen = () => {
		setOpen(!open);
	}
	  
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div id="leftcard">
			{
				open ? (
					<div id="closecard">
						<IconButton aria-label="delete" size="large" onClick={() => handleOpen()}>
							<img src="assets/closeleft.svg" alt="NO"/>	
						</IconButton>
					</div>
				) : (
					<div id="opencard">
						<IconButton aria-label="delete" size="large" onClick={() => handleOpen()} style={{marginLeft: '-25px', paddingRight: '0px'}}>
							<img src="assets/openright.svg" alt="NO"/>	
						</IconButton>
					</div>
				)
			}
			{
				open && (
					<>
						<p id="header">Blocks</p>
						<div id="search">
							<img src="assets/search.svg" alt="NO"/>
							<input type="text" placeholder="Search blocks" />
						</div>
						<div id="subnav" >
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab label="Trigger" {...a11yProps(0)} />
								<Tab label="Action" {...a11yProps(1)} />
								<Tab label="Structure" {...a11yProps(2)} />
							</Tabs>
						</div>	
						<TabPanel value={value} index={0}>
							<div id="blocklist">
								{
									CardList_Triggers.map((trigger) => {
										return <LeftCard key={trigger.id} data={trigger} open={open}/>
									})
								}
							</div>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<div id="blocklist">
								{
									CardList_Actions.map((trigger) => {
										return <LeftCard key={trigger.id} data={trigger} open={open}/>
									})
								}
							</div>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<div id="blocklist">
								{
									CardList_Structure.map((trigger) => {
										return <LeftCard key={trigger.id} data={trigger} open={open}/>
									})
								}
							</div>
						</TabPanel>
					</>
				)
			}
			{
				!open && (
					<div id="blocklist" style={{marginLeft: '-20px'}}>
						{
							CardList_Triggers.map((trigger) => {
								return <LeftCard key={trigger.id} data={trigger} open={open}/>
							})
						}
						<Divider style={{width: '40px', marginLeft: '20px', marginTop: '10px'}}/>
						{
							CardList_Actions.map((trigger) => {
								return <LeftCard key={trigger.id} data={trigger} open={open}/>
							})
						}
						<Divider style={{width: '40px', marginLeft: '20px', marginTop: '10px'}}/>
						{
							CardList_Structure.map((trigger) => {
								return <LeftCard key={trigger.id} data={trigger} open={open}/>
							})
						}
					</div>
				)
			}
		</div>    
  );
}
