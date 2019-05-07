import React from 'react'
import SiteWrapper from './SiteWrapper.react'
import "tabler-react/dist/Tabler.css";
import './VoterStatusPage.css'
import {options, states, months, dates, years} from './Utilities';


class VoterStatusPage extends React.Component{
    constructor(){
        super()
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }

    render(){
        return(
            <SiteWrapper className="sitewrapper">
                <div className="voterForm">
                
                <form onSubmit={this.onSubmit}>
                    <h1>Check Your Voter Registration Status</h1>   

                    <div className="formGroupA">
                        <input className="A" placeholder="First Name"  name="FirstName" />
                        <input className="A" placeholder="Last Name"  name="LastName" />
                    </div>     
                    
                    <div className="formGroupB">
                        <input id="address" placeholder="Address"  name="Address" />
                    </div>

                    <div className="formGroupC">
                        <input id="city" placeholder="City"  name="City" />
                        <input id="state" placeholder="State"  name="State" />
                        <input id="state" placeholder="State"  name="State" />
                    </div>

                    <div>
                    <button>Look up my status</button>
                    </div>
                </form>

                </div>
          
            </SiteWrapper>
           
        )
    }
}


export default VoterStatusPage;