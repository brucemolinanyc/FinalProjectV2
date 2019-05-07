// @flow

import * as React from "react";
import { Link } from 'react-router-dom';
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

// {input: "whitestone ny 11357", 
// offices: Array(7), 
// officials: Array(8), 
// specificOfficeName: Array(8), 
// specificOfficialName: Array(8)}

  render() {
    const reps = (this.state.officials !== null) && this.state.officials.map((el,idx) => 
    <Table.Row >
      <Table.Col>
        {<img  height="150" width="150" src={el['photoUrl'] ? el['photoUrl'] : "https://us.123rf.com/450wm/sharpner/sharpner1702/sharpner170200005/71130029-waving-american-flag.jpg?ver=6"}></img>}
        <br></br>
        {this.state.specificOfficialName && <strong>{this.state.specificOfficialName[idx]}</strong>} ({el['party'] && el['party'].slice(0,1) === "R" ? <strong><font color="red">R</font></strong> : <strong><font color="blue">D</font></strong>})
      </Table.Col>

      <Table.Col>
      {this.state.specificOfficeName && this.state.specificOfficeName[idx]} 
      </Table.Col>

      <Table.Col>
        {el.address && el.address[0].line1} <br></br>
        {el.address && el.address[0].line2} <br></br>
        {el.address && el.address[0].city + ", "}
        {el.address && el.address[0].state}
        {el.address && el.address[0].zip}
      </Table.Col>

      <Table.Col>
        <Link to={`/representative/${this.state.specificOfficialName[idx]}`}>Profile</Link>
      </Table.Col>
    
    </Table.Row>
    )
   

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


          <Grid.Row>
            <Grid.Col lg={12}>
              <Card>
              {(this.state.officials && 
                <Table className="card-table table-vcenter">
                  <Table.Header>
                    <Table.ColHeader colspan={4}>Representative</Table.ColHeader>
                    <Table.ColHeader colspan={2}>Office</Table.ColHeader>
                    <Table.ColHeader colspan={4}>Address</Table.ColHeader>
                    <Table.ColHeader colspan={2}>Links</Table.ColHeader>
                  </Table.Header>
                  <Table.Body>

                  {this.state.officials && reps}

                  </Table.Body>
                </Table> )}
               
              </Card>
            </Grid.Col>
          </Grid.Row>


        </Page.Content>      
      </SiteWrapper>
    );
  }
}

export default Home;
