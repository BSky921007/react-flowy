import * as React from 'react';
import { base_url } from '../Globals'
import LeftCard from './LeftCard';
import {CardList_Actions, CardList_Triggers, CardList_Structure} from '../Globals';

import { ThemeProvider, CSSReset, Box, Heading, Text, Image, Input, Divider, Tabs, Tab, TabList, TabPanels, TabPanel, IconButton } from '@chakra-ui/react'
import theme from '../styles/theme'

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
		<ThemeProvider theme={theme}>
			<CSSReset />
			<Box id="lefttab" w="fixed" bg="#FFF" box-sizing="border-box" position="absolute" z-index="2">
				{
					open ? (
						<Box id="closecard" pt="10px">
							<IconButton aria-label="delete" size="large" onClick={() => handleOpen()}>
								<img src={`${base_url}/assets/closeleft.svg`} alt="NO"/>	
							</IconButton>
						</Box>
					) : (
						<Box ml="12px" mt="40px">
							<IconButton aria-label="delete" size="large" onClick={() => handleOpen()}>
								<img src={`${base_url}/assets/openright.svg`} alt="NO"/>	
							</IconButton>
						</Box>
					)
				}
				{
					open && (
						<Box borderRight="1px solid lightgray" pt="4" h="100%">
							<Box w="100%" mt="2">
								<Heading as="h2" size="md">Blocks</Heading>
								<Box id="search" mt="2">
									<Image src={`${base_url}/assets/search.svg`} alt="Search"/>
									<Input type="text" placeholder="Search blocks" />
								</Box>
							</Box>
							<Box w="100%" mt="8">
								<Tabs value={value} onChange={handleChange} size="md" variant="soft-rounded">
									<TabList>
										<Tab>Trigger</Tab>
										<Tab>Action</Tab>
										<Tab>Structure</Tab>
									</TabList>
									<TabPanels>
										<TabPanel value={value} index={0}>
											<Box id="blocklist">
											{
												CardList_Triggers.map((trigger) => {
													return <LeftCard key={trigger.id} data={trigger} open={open}/>
												})
											}
											</Box>
										</TabPanel>
										<TabPanel value={value} index={1}>
											<Box id="blocklist">
												{
													CardList_Actions.map((trigger) => {
														return <LeftCard key={trigger.id} data={trigger} open={open}/>
													})
												}
											</Box>
										</TabPanel>
										<TabPanel value={value} index={2}>
											<Box id="blocklist">
												{
													CardList_Structure.map((trigger) => {
														return <LeftCard key={trigger.id} data={trigger} open={open}/>
													})
												}
											</Box>
										</TabPanel>
									</TabPanels>
								</Tabs>
							</Box>							
						</Box>
					)
				}
				{
					!open && (
						<Box id="blocklist">
							{
								CardList_Triggers.map((trigger) => {
									return <LeftCard key={trigger.id} data={trigger} open={open}/>
								})
							}
							<Divider style={{width: '40px', marginLeft: '9px', marginTop: '10px'}}/>
							{
								CardList_Actions.map((trigger) => {
									return <LeftCard key={trigger.id} data={trigger} open={open}/>
								})
							}
							<Divider style={{width: '40px', marginLeft: '9px', marginTop: '10px'}}/>
							{
								CardList_Structure.map((trigger) => {
									return <LeftCard key={trigger.id} data={trigger} open={open}/>
								})
							}
						</Box>
					)
				}
			</Box>    
		</ThemeProvider>
  );
}
