import React from 'react';
import {base_url} from '../Globals';

class Header extends React.Component {
    render() {
        return (
            <div id="navigation">
                <div id="leftside">
                    <div id="details">
                    <div id="back"><img src={`${base_url}/assets/arrow.svg`} /></div>
                    <div id="names">
                    <p id="title">Dyslipidemia</p>
                    <p id="subtitle">Statins for primary prevention</p>
                    </div>
                </div>            
                </div>
                <div id="centerswitch">
                    <div id="leftswitch">Diagram view</div>
                    <div id="rightswitch">Code editor by</div>
                </div>
                <div id="buttonsright">
                    <div id="discard">Discard</div>
                    <div id="publish">Save Changes</div>
                </div>
                </div>
        )
    }
}

export default Header;
