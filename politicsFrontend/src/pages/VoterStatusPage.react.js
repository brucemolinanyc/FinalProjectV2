import React from 'react'
import SiteWrapper from './SiteWrapper.react'
import "tabler-react/dist/Tabler.css";
import './VoterStatusPage.css'
import {FormSuccess, FormFailure} from './RegistrationStatusPages'


class VoterStatusPage extends React.Component{
    constructor(){
        super()

        this.state = {
            FirstName: null,
            LastName: null,
            Gender: null,
            City: null,
            State: null,
            ZipCode: null,
            Month: null,
            Day: null,
            Year: null,
            VoterName: ''
        }
    }


    onSubmit = (e) => {
        e.preventDefault()
        const FirstName = this.state.FirstName.toUpperCase()
        const LastName = this.state.LastName.toUpperCase()
        const Gender = this.state.Gender.toUpperCase()
        const ZipCode = this.state.ZipCode
        const Month= this.state.Month
        const Day = this.state.Day
        const Year = this.state.Year
        const formattedBirthdate = `${Year}${Month}${Day}`
        const formattedGender = Gender === "MALE" ? "M" : "F"

        fetch(`http://localhost:5000/search/${FirstName}/${LastName}/${formattedGender}/${formattedBirthdate}/${ZipCode}`,{
            method: 'get',
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then(data => {
            if (data.truthy === true){
                this.setState({VoterName: data.voter})
            } else {
                this.setState({VoterName: false})
            }
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    genderChange = (e) => {
        let element = document.getElementById("Gender")
        let gender = element.options[element.selectedIndex].text            
        this.setState({ Gender : gender})
    }

    stateChange = (e) => {
        let element = document.getElementById("State")
        let state = element.options[element.selectedIndex].text          
        this.setState({ State : state})
    }

    monthChange = (e) => {
        let element = document.getElementById("Month")
        let month = element.options[element.selectedIndex].text        
        this.setState({ Month : month})
    }

    dayChange = (e) => {
        let element = document.getElementById("Day")
        let day = element.options[element.selectedIndex].text
        this.setState({ Day : day})
    }

    yearChange = (e) => {
        let element = document.getElementById("Year")
        let year = element.options[element.selectedIndex].text
        this.setState({ Year : year})
    }

    render(){
        const result = (this.state.VoterName !== '' && this.state.VoterName) ?  <FormSuccess/> : <FormFailure/>
        return(
            <SiteWrapper className="sitewrapper">
                <div className="voterForm">
                    
                    <form onSubmit={this.onSubmit}>
                        <h1>Check Your Voter Registration Status</h1>   

                        <div className="formGroupA">
                            <input className="A" placeholder="First Name"  name="FirstName" onChange={this.onChange} />
                            <input className="A" placeholder="Last Name"  name="LastName" onChange={this.onChange}/>
                        
                            <select id="Gender" placeholder="Gender"  name="Gender" onChange={this.genderChange}>
                            <option disabled selected value> Gender </option> 
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            </select>
                    
                        </div>     
                        
                        <div className="formGroupB">
                            <input id="address" placeholder="Address"  name="Address" />
                        </div>

                        <div className="formGroupC">

                            <input id="city" placeholder="City"  name="City" onChange={this.onChange} />
                            
                            <select id="State" placeholder="State" name="State" onChange={this.stateChange}>
                                    <option disabled selected value>  State </option>                                                   
                                    <option value='Alabama'>Alabama</option>
                                    <option value='Alaska'>Alaska</option>
                                    <option value='Arizona'>Arizona</option>
                                    <option value='Arkansas'>Arkansas</option>
                                    <option value='California'>California</option>
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
                            <input id="zip" placeholder="ZipCode"  name="ZipCode" onChange={this.onChange}/>
                        </div>

                        <div className="formGroupD">
                            <select id="Month" placeholder="Month"  name="Month" onChange={this.monthChange}>
                                <option disabled selected value>  Month  </option> 
                                <option value='01'>01</option>
                                <option value='02'>02</option>
                                <option value='03'>03</option>
                                <option value='04'>04</option>
                                <option value='05'>05</option>
                                <option value='06'>06</option>
                                <option value='07'>07</option>
                                <option value='08'>08</option>
                                <option value='09'>09</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                            </select>

                            <select id="Day" placeholder="Day"  name="Day" onChange={this.dayChange}>
                                <option disabled selected value>  Day </option> 
                                <option value='01'>01</option>
                                <option value='02'>02</option>
                                <option value='03'>03</option>
                                <option value='04'>04</option>
                                <option value='05'>05</option>
                                <option value='06'>06</option>
                                <option value='07'>07</option>
                                <option value='08'>08</option>
                                <option value='09'>09</option>
                                <option value= '10'>10</option>
                                <option value= '11'>11</option>
                                <option value= '12'>12</option>
                                <option value= '13'>13</option>
                                <option value= '14'>14</option>
                                <option value= '15'>15</option>
                                <option value= '16'>16</option>
                                <option value= '17'>17</option>
                                <option value= '18'>18</option>
                                <option value= '19'>19</option>
                                <option value= '20'>20</option>
                                <option value= '21'>21</option>
                                <option value= '22'>22</option>
                                <option value= '23'>23</option>
                                <option value= '24'>24</option>
                                <option value= '25'>25</option>
                                <option value= '26'>26</option>
                                <option value= '27'>27</option>
                                <option value= '28'>28</option>
                                <option value= '29'>29</option>
                                <option value= '30'>30</option>
                                <option value= '31'>31</option>
                            </select>

                            <select id="Year" placeholder="Year"  name="Year" onChange={this.yearChange}>
                                <option disabled selected value>  Year </option> 
                                <option value= '2018'>2018</option>
                                <option value= '2017'>2017</option>
                                <option value= '2016'>2016</option>
                                <option value= '2015'>2015</option>
                                <option value= '2014'>2014</option>
                                <option value= '2013'>2013</option>
                                <option value= '2012'>2012</option>
                                <option value= '2011'>2011</option>
                                <option value= '2010'>2010</option>
                                <option value= '2009'>2009</option>
                                <option value= '2008'>2008</option>
                                <option value= '2007'>2007</option>
                                <option value= '2006'>2006</option>
                                <option value= '2005'>2005</option>
                                <option value= '2004'>2004</option>
                                <option value= '2003'>2003</option>
                                <option value= '2002'>2002</option>
                                <option value= '2001'>2001</option>
                                <option value= '2000'>2000</option>
                                <option value= '1999'>1999</option>
                                <option value= '1998'>1998</option>
                                <option value= '1997'>1997</option>
                                <option value= '1996'>1996</option>
                                <option value= '1995'>1995</option>
                                <option value= '1994'>1994</option>
                                <option value= '1993'>1993</option>
                                <option value= '1992'>1992</option>
                                <option value= '1991'>1991</option>
                                <option value= '1990'>1990</option>
                                <option value= '1989'>1989</option>
                                <option value= '1988'>1988</option>
                                <option value= '1987'>1987</option>
                                <option value= '1986'>1986</option>
                                <option value= '1985'>1985</option>
                                <option value= '1984'>1984</option>
                                <option value= '1983'>1983</option>
                                <option value= '1982'>1982</option>
                                <option value= '1981'>1981</option>
                                <option value= '1980'>1980</option>
                                <option value= '1979'>1979</option>
                                <option value= '1978'>1978</option>
                                <option value= '1977'>1977</option>
                                <option value= '1976'>1976</option>
                                <option value= '1975'>1975</option>
                                <option value= '1974'>1974</option>
                                <option value= '1973'>1973</option>
                                <option value= '1972'>1972</option>
                                <option value= '1971'>1971</option>
                                <option value= '1970'>1970</option>
                                <option value= '1969'>1969</option>
                                <option value= '1968'>1968</option>
                                <option value= '1967'>1967</option>
                                <option value= '1966'>1966</option>
                                <option value= '1965'>1965</option>
                                <option value= '1964'>1964</option>
                                <option value= '1963'>1963</option>
                                <option value= '1962'>1962</option>
                                <option value= '1961'>1961</option>
                                <option value= '1960'>1960</option>
                                <option value= '1959'>1959</option>
                                <option value= '1958'>1958</option>
                                <option value= '1957'>1957</option>
                                <option value= '1956'>1956</option>
                                <option value= '1955'>1955</option>
                                <option value= '1954'>1954</option>
                                <option value= '1953'>1953</option>
                                <option value= '1952'>1952</option>
                                <option value= '1951'>1951</option>
                                <option value= '1950'>1950</option>
                                <option value= '1949'>1949</option>
                                <option value= '1948'>1948</option>
                                <option value= '1947'>1947</option>
                                <option value= '1946'>1946</option>
                                <option value= '1945'>1945</option>
                                <option value= '1944'>1944</option>
                                <option value= '1943'>1943</option>
                                <option value= '1942'>1942</option>
                                <option value= '1941'>1941</option>
                                <option value= '1940'>1940</option>
                                <option value= '1939'>1939</option>
                                <option value= '1938'>1938</option>
                                <option value= '1937'>1937</option>
                                <option value= '1936'>1936</option>
                                <option value= '1935'>1935</option>
                                <option value= '1934'>1934</option>
                                <option value= '1933'>1933</option>
                                <option value= '1932'>1932</option>
                                <option value= '1931'>1931</option>
                                <option value= '1930'>1930</option>
                            </select>
                        </div>
                        {console.log(this.state)}
                        <div className="button">
                            <button>Look up my status</button>
                        </div>
                    </form>
                </div>

                <div className="registrationResult"> 
                    {(this.state.VoterName && result) || (this.state.VoterName === false && result)}
                </div>
            </SiteWrapper>
           
        )
    }
}


export default VoterStatusPage;