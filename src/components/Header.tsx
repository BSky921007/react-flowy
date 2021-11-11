import React from 'react';
import { useState } from 'react';
import {base_url} from '../Globals';
import PreviewModal from './PreviewModal';

const Header = (props: any) => {

    const [isPathwayVisible, setPathwayVisible] = useState(false)

    const closePathway = () =>{ setPathwayVisible(false) }
    const openPathway = () =>{ setPathwayVisible(true) }

        return (<div>
            <div id="navigation">
                <div id="leftside">
                    <div id="details">
                    <div id="back"><img src={`${base_url}/assets/logo_small.png`} alt="NO"/></div>
                    <div id="names">
                    <p id="title">Dyslipidemia</p>
                    <p id="subtitle">Statins for primary prevention</p>
                    </div>
                </div>            
                </div>
                {/* <div id="centerswitch">
                    <div id="leftswitch">Diagram view</div>
                    <div id="rightswitch">Code editor by</div>
                </div> */}
                <div id="buttonsright">
                    <div id="discard">Discard</div>
                    <div id="publish" onClick={openPathway}>Preview</div>
                </div>
            </div>
            <div id="modals">
                { isPathwayVisible ? <PreviewModal data={{ pathway_id: 'recXXX' }} onClose={closePathway}/> : <></>}
            </div></div>
        )

}

export default Header;
