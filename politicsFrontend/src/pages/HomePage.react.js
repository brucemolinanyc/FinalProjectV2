// @flow

import * as React from "react";
import axios from "axios";

import {
  Page,
  Avatar,
  Icon,
  Grid,
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
  };

  render() {
    return (
      <SiteWrapper>
        <Page.Content title="Dashboard">
          <Grid.Row cards={true}>
            <Grid.Col sm={6} lg={3}>
              <StampCard
                color="red"
                icon="alert-circle"
                header={
                  <a href="#" onClick={this.handleClick}>
                    30 <small>Orders</small>
                  </a>
                }
                footer={"14 in progress"}
              />
            </Grid.Col>
            <Grid.Col sm={6} lg={3}>
              <StampCard
                color="orange"
                icon="box"
                header={
                  <a href="#">
                    9 <small>Inventory Items</small>
                  </a>
                }
                footer={"Running low"}
              />
            </Grid.Col>
            <Grid.Col sm={6} lg={3}>
              <StampCard
                color="blue"
                icon="users"
                header={
                  <a href="#">
                    17 <small>Employees Available</small>
                  </a>
                }
                footer={"6 unavailable"}
              />
            </Grid.Col>
            <Grid.Col sm={6} lg={3}>
              <StampCard
                color="green"
                icon="dollar-sign"
                header={<a href="/relief">Relief Funds Status</a>}
                footer={"Up-to-date"}
              />
            </Grid.Col>

            <Grid.Col md={12}>
              <Grid.Row>
                
              </Grid.Row>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col width={12}>
             
            </Grid.Col>
          </Grid.Row>
        </Page.Content>
      </SiteWrapper>
    );
  }
}

export default Home;
