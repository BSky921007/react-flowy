import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/Button';
import {base_url} from '../Globals';
import { CardData, GlobalData, BundleType, ProtocolType } from '../types';
import { stringify } from 'querystring';

type HeaderProps = {
    data: CardData[], 
    bundles: BundleType[], 
    protocols: ProtocolType[], 
    selBundle: BundleType|undefined, 
    selProtocol: ProtocolType|undefined, 
    onLoad: Function, 
    onViewGlobal: Function
}

const Header = (props: HeaderProps) => {
    const { bundles, protocols, selBundle, selProtocol } = props;
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [rightCards, setRightCards] = useState<CardData[]>([]);

    useEffect(() => {
        setSubTitle(selProtocol ? selProtocol.fields.name : protocols[0]?.fields?.name);
    }, [protocols, selProtocol]);
        
    useEffect(() => {
        setTitle(selBundle ? selBundle.fields.name : bundles[0]?.fields?.name);
    }, [bundles, selBundle])

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
        console.log(event.target.files);
        var fileToLoad = event.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            const textFromFileLoaded = fileLoadedEvent.target?fileLoadedEvent.target.result:'';
            const tempData = JSON.parse(textFromFileLoaded as string);
            console.log(tempData.blocks);
            setRightCards(tempData.blocks);
            props.onLoad(tempData);
        };
        fileReader.readAsText(fileToLoad, 'UTF-8');
    }

    const onClickGlobal: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        console.log('header click on global');
        props.onViewGlobal(title, subTitle);
    }

    useEffect(() => {
        setRightCards(props.data);
    }, [props])

    return (
        <div>
            <div id="navigation">
                <div id="leftside" onClick={onClickGlobal}>
                    <div id="details">
                    <div id="back"><img src={`${base_url}/assets/logo_small.png`} alt="NO"/></div>
                    <div id="names">
                    <p id="title">{title}</p>
                    <p id="subtitle">{subTitle}</p>
                    </div>
                </div>            
                </div>
                <div id="centerswitch">
                    <div id="leftswitch">
                        <IconButton
                            aria-label="delete"
                            onClick={() => {
                                DownloadJSON(rightCards);
                            }}
                            >
                            Save Cards as JSON file
                        </IconButton>
                    </div>
                    <div id="rightswitch">
                        <label htmlFor="uploadInput">Import JSON file</label>
                        <input id="uploadInput" type="file" accept=".json" style={{display: 'none'}} onChange={ (e) => handleFileInput(e) } />
                    </div>
                </div>
                <div id="buttonsright">
                    <div id="discard">Discard</div>
                    <div id="publish">Preview</div>
                </div>
            </div>
        </div>
    )

}

export default Header
