import React, { useEffect, useState, useRef } from 'react';
import {base_url} from '../Globals';
import { CardData, GlobalData, BundleType, ProtocolType } from '../types';
import { ThemeProvider, CSSReset, Grid, Spacer, HStack, Link, IconButton, Button, Box, FormControl, Icon, InputGroup, Image, Text, Heading } from '@chakra-ui/react'
import { TriangleDownIcon } from '@chakra-ui/icons'
import { Link as RouteLink } from 'react-router-dom'
import theme from '../styles/theme'

type FileUploadProps = {
    onChange: (event: any) => void
    accept: string
    buttonText: string
}
  
const FileUpload = (props: FileUploadProps) => {
    const { accept, onChange, buttonText } = props
    
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = (event: any) => {
        inputRef?.current?.click()
        event.stopPropagation()
    }

    const onChangeWrapper = (event: any) => {
        onChange(event)
        event.stopPropagation()
    }
    return (
        <InputGroup onClick={handleClick}>
          <input
            accept={accept}
            type={'file'}
            multiple={false}
            hidden
            onChange={onChangeWrapper}
            ref={inputRef}
          />
          <Button onClick={handleClick}>
            {buttonText}
          </Button>
        </InputGroup>
    )
  }

  
type HeaderProps = {
    isOpenHeader: boolean, 
    data: CardData[], 
    bundles: BundleType[], 
    protocols: ProtocolType[], 
    selBundle: BundleType|undefined, 
    selProtocol: ProtocolType|undefined, 
    onLoad: Function, 
    onViewGlobal: Function, 
    onViewHeader: Function
}

const Header = (props: HeaderProps) => {
    const { bundles, protocols, selBundle, selProtocol, isOpenHeader } = props;
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [rightCards, setRightCards] = useState<CardData[]>([]);

    useEffect(() => {
        setTitle(selBundle ? selBundle.fields.name : bundles[0]?.fields?.name);
        setSubTitle(selProtocol ? selProtocol.fields.name : protocols[0]?.fields?.name);
    }, [protocols, selProtocol, bundles, selBundle]);

    const DownloadJSON = (Data: any) => {
        const savingData: GlobalData = {
            properties: {
                bundle: selBundle ? selBundle : bundles[0], 
                protocol: selProtocol ? selProtocol : protocols[0]
            }, 
            blocks: Data
        }
        const dataStr =
            'data:application/json;charset=utf-8,' + 
            encodeURIComponent(JSON.stringify(savingData));
        const download = document.createElement('a');
        download.setAttribute('href', dataStr);
        download.setAttribute('download', 'CardData' + '.json');
        document.body.appendChild(download);
        download.click();
        download.remove();
    };

    const handleFileInput = (event: any) => {
        var fileToLoad = event.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            const textFromFileLoaded = fileLoadedEvent.target?fileLoadedEvent.target.result:'';
            const tempData = JSON.parse(textFromFileLoaded as string);
            setRightCards(tempData.blocks);
            props.onLoad(tempData);
        };
        fileReader.readAsText(fileToLoad, 'UTF-8');
    }

    const onClickGlobal: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        props.onViewGlobal();
    }

    const openHeaderProperties = () => {
        props.onViewHeader();
    }

    useEffect(() => {
        setRightCards(props.data);
    }, [props]);

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Box display="flex" height="76px" pt="16px" pb="16px" borderBottom="1px solid lightgray">
                <Box w="350px" display="flex" align="flex-start">
                    <Image src={`${base_url}/assets/logo_small.png`} width="40px" height="37px" mt="2px" alt="Logo"/>
                    <Heading as="h1" size="lg" ml="4">Protocol Editor</Heading>
                </Box>
                <Box id="details" w="350px" display="flex">
                    <Box onClick={onClickGlobal} mr="4">
                        <Heading as="h3" size="sm">{title}</Heading>
                        <Text>{subTitle}</Text>
                    </Box>            
                    <IconButton
                        aria-label=""
                        icon={<TriangleDownIcon/>}
                        onClick={openHeaderProperties}>
                        {!isOpenHeader ? 'Open' : 'Close'}
                    </IconButton>
                </Box>
                <Box w="350px" display="flex" float="right">
                    <Box ml="4">
                        <Button
                            aria-label="delete"
                            onClick={() => {
                                DownloadJSON(rightCards);
                            }}
                            >
                            Save JSON
                        </Button>
                    </Box>
                    <Box ml="4">
                        <FormControl>
                        <FileUpload
                            accept={'.json'}
                            onChange={handleFileInput}
                            buttonText="Load JSON"
                        />
                        </FormControl>
                    </Box>
                    <Box position="absolute" right="100">
                        {
                            (selBundle && selProtocol && selBundle.id && selProtocol.id) && (
                                // <RouteLink to={`/bundles/${selBundle!.id}/protocols/${selProtocol!.id}`}>
                                    <a href={`/bundles/${selBundle!.id}/protocols/${selProtocol!.id}`}>
                                        <Button colorScheme="blue">
                                            Preview
                                        </Button>
                                    </a>
                                // </RouteLink>
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )

}

export default Header
