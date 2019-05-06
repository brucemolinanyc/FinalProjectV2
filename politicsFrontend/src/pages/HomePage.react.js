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
  
  };

 
  handleClick = () => {
    console.log('clicked')
  };

  render() {
    return (
      <SiteWrapper className="sitewrapper">
        <Page.Content className="content" title="">
          <h1>Your Representatives</h1>
          <p>Enter your address to <strong>find and contact</strong> your federal, state, county and local elected representatives</p>

          <Form.Group size="md" label="">
            <Form.InputGroup  >
              <Form.Input placeholder="Enter your address here" />
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
      
      </SiteWrapper>
    );
  }
}

export default Home;
