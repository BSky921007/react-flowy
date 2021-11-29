import React, { DragEvent, useState } from 'react';
import { base_url } from '../Globals';
import {LeftCardProps} from '../types';
import { ThemeProvider, CSSReset, Link, Button, IconButton, Box, Input, Image, Text, Heading } from '@chakra-ui/react'
import theme from '../styles/theme'


type CardProps = {
    data: LeftCardProps, 
    open: boolean, 
}

const LeftCard = (props: CardProps) => {
    const {data, open} = props;
    const { id, lefticon, name, desc } = data;

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('activeCard', JSON.stringify({ id }));
    }
   
    return (
        <ThemeProvider theme={theme}>
            <Box 
                className="blockelem create-flowy noselect" 
                draggable={true} 
                onDragStart={handleDragStart} 
                style={{width: `${open&&'318px'}`}}>
                {
                    open ? (
                        <Box>
                            <Input type="hidden" name='blockelemtype' className="blockelemtype" value="1" />
                            <Box className="grabme" mt="12px">
                                <Image src={`${base_url}/assets/grabme.svg`} alt="NO"/>
                            </Box>
                            <Box className="blockin">
                                <IconButton aria-label="">
                                    <Image src={lefticon} alt="NO" style={{width: '24px'}}/>
                                </IconButton>
                                <Box className="blocktext">
                                    <Text className="blocktitle">{name}</Text>
                                    <Text className="blockdesc">{desc}</Text>
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            <Box className="blockin">
                                <Box className="blockico">
                                    <Text></Text>
                                    <Image src={lefticon} alt="NO" style={{width: '24px'}}/>
                                </Box>
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </ThemeProvider>
    )
}

export default LeftCard;
