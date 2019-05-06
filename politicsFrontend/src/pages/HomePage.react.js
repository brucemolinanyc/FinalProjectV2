// @flow

import * as React from "react";
import './HomePage.react.css'

import {
  Page,
  Avatar,
  Icon,
  Grid,
  Form,
  Input,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
  Stamp
} from "tabler-react";

import "tabler-react/dist/Tabler.css";
import SiteWrapper from "./SiteWrapper.react";


class Home extends React.Component {
    state = {
      input: null,
      offices: null,
      officials: null,
      specificOfficeName: null,
      specificOfficialName: null
  }

  onChange = (e) => {
    this.setState({input: e.target.value})
  }
 
  handleClick = (e) => {
    const address_elements = this.state.input.split(" ")
    const city = address_elements.slice(-3)[0]
    const state = address_elements.slice(-2)[0]
    const zipcode = address_elements.slice(-1)[0]

    fetch(`http://127.0.0.1:5000/google/${city}/${state}/${zipcode}`, {
        method: 'get',
        mode: "cors",
    })
    .then(response => response.json())
    .then(data => {
        const offices_state = []
        const officials_state = []
        data.offices.map((el) => {
            var i = 0
            do {
                i ++
                offices_state.push(el.name)
            } while(i < el.officialIndices.length);
        })
        data.officials.map((el) => {
            officials_state.push(el.name)
        })
        
        this.setState({
        specificOfficeName: offices_state,
        specificOfficialName: officials_state,
        offices: data.offices,
        officials: data.officials
    })
    
    }
    )
}

  render() {
    return (
      <SiteWrapper className="sitewrapper">
        <Page.Content className="content" title="">
          <h1>Your Representatives</h1>
          <p>Enter your address to <strong>find and contact</strong> your federal, state, county and local elected representatives</p>

          <Form.Group size="md" label="">
            <Form.InputGroup  >
              <Form.Input onChange={this.onChange} placeholder="Enter your address here" />
              <Form.InputGroupAppend>
                <Button
                  color="primary"
                  size="lg"
                  onClick={this.handleClick}
                >
                  Go!
                </Button>
              </Form.InputGroupAppend>
            </Form.InputGroup>
          </Form.Group>
        </Page.Content>

        {console.log(this.state)}
      
      </SiteWrapper>
    );
  }
}

export default Home;
