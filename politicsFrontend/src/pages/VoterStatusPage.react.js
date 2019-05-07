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
                    
                        <select id="Gender" placeholder="Gender"  name="Gender">
                        <option disabled selected value> -- Gender -- </option> 
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        </select>
                
                    </div>     
                    
                    <div className="formGroupB">
                        <input id="address" placeholder="Address"  name="Address" />
                    </div>

                    <div className="formGroupC">
                        <input id="city" placeholder="City"  name="City" />
                            <select id="state" placeholder="State" name="State">
                                <option disabled selected value> -- State -- </option>                                                   
                                <option value='Alabama'>Alabama</option>
                                <option value='Alaska'>Alaska</option>
                                <option value='Arizona'>Arizona</option>
                                <option value='Arkansas'>Arkansas</option>
                                <option value='California'>California></option>
                                <option value='Colorado'>Colorado</option>
                                <option value='Connecticut'>Connecticut</option>
                                <option value='Delaware'> Delaware</option>
                                <option value='DistrictOfColumbia'> District Of Columbia </option>
                                <option value='Florida'>Florida</option>
                                <option value='Georgia'> Georgia</option>
                                <option value='Hawaii'> Hawaii</option>
                                <option value='Idaho'>Idaho</option>
                                <option value='Illinois'> Illinois</option>
                                <option value='Indiana'> Indiana</option>
                                <option value='Iowa'>Iowa</option>
                                <option value='Kansas'> Kansas</option>
                                <option value='Kentucky'> Kentucky</option>
                                <option value='Louisiana'> Louisiana</option>
                                <option value='Maine'>Maine</option>
                                <option value='Maryland'> Maryland</option>
                                <option value='Massachusetts'> Massachusetts</option>
                                <option value='Michigan'> Michigan</option>
                                <option value='Minnesota'> Minnesota</option>
                                <option value='Mississippi'> Mississippi</option>
                                <option value='Missouri'> Missouri</option>
                                <option value='Montana'> Montana</option>
                                <option value='Nebraska'> Nebraska</option>
                                <option value='Nevada'> Nevada</option>
                                <option value='New Hampshire'> New Hampshire</option>
                                <option value='New Jersey'> New Jersey</option>
                                <option value='New Mexico'> New Mexico</option>
                                <option value='New York'> New York</option>
                                <option value='North Carolina'> North Carolina</option>
                                <option value='North Dakota'> North Dakota</option>
                                <option value='Ohio'>  Ohio</option>
                                <option value='Oklahoma'> Oklahoma</option>
                                <option value='Oregon'> Oregon</option>
                                <option value='Pennsylvania'> Pennsylvania</option>
                                <option value='Rhode Island'> Rhode Island</option>
                                <option value='South Carolina'>  South Carolina</option>
                                <option value='South Dakota'>South Dakota</option>
                                <option value='Tennessee'> Tennessee</option>
                                <option value='Texas'> Texas</option>
                                <option value='Utah'>  Utah</option>
                                <option value='Vermont'> Vermont</option>
                                <option value='Virginia'>  Virginia</option>
                                <option value='Washington'>  Washington</option>
                                <option value='West Virginia'> West Virginia</option>
                                <option value='Wisconsin'> Wisconsin </option>
                                <option value='Wyoming'> Wyoming </option>               
                            </select>
                        <input id="zip" placeholder="Zipcode"  name="Zipcode" />
                    </div>

                    <div className="button">
                        <button>Look up my status</button>
                    </div>
                </form>

                </div>
          
            </SiteWrapper>
           
        )
    }
}


export default VoterStatusPage;