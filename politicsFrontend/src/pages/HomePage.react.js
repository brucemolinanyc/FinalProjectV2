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

import C3Chart from "react-c3js";

import SiteWrapper from "./SiteWrapper.react";

class Home extends React.Component {
  state = {
  
  };

 
  handleClick = () => {
    console.log(this.state.invoices);
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
                <Grid.Col sm={4}>
                  <Card
                    title={"Energy"}
                    options={<Icon prefix="fe" name="battery-charging" />}
                    body={
                      <C3Chart
                        style={{ height: "12rem" }}
                        data={{
                          columns: [
                            // each columns data
                            ["data1", 63],
                            ["data2", 37]
                          ],
                          type: "donut", // default type of chart
                          colors: {
                            data1: colors["green"],
                            data2: colors["green-light"]
                          },
                          names: {
                            // name of each serie
                            data1: "Maximum",
                            data2: "Minimum"
                          }
                        }}
                        legend={{
                          show: false //hide legend
                        }}
                        padding={{
                          bottom: 0,
                          top: 0
                        }}
                      />
                    }
                  />
                </Grid.Col>
                <Grid.Col sm={4}>
                  <Card
                    title={"Employees"}
                    options={<Icon prefix="fe" name="users" />}
                    body={
                      <C3Chart
                        style={{ height: "12rem" }}
                        data={{
                          columns: [
                            // each columns data
                            ["data1", 63],
                            ["data2", 44],
                            ["data3", 12],
                            ["data4", 14]
                          ],
                          type: "pie", // default type of chart
                          colors: {
                            data1: colors["blue-darker"],
                            data2: colors["blue"],
                            data3: colors["blue-light"],
                            data4: colors["blue-lighter"]
                          },
                          names: {
                            // name of each serie
                            data1: "A",
                            data2: "B",
                            data3: "C",
                            data4: "D"
                          }
                        }}
                        legend={{
                          show: false //hide legend
                        }}
                        padding={{
                          bottom: 0,
                          top: 0
                        }}
                      />
                    }
                  />
                </Grid.Col>
                <Grid.Col sm={4}>
                  <Card
                    title={"Order Status"}
                    options={<Icon prefix="fe" name="file-text" />}
                    body={
                      <C3Chart
                        style={{ height: "12rem" }}
                        data={{
                          columns: [
                            // each columns data
                            ["data1", 11, 8, 15, 18, 19, 17],
                            ["data2", 7, 7, 5, 7, 9, 12]
                          ],
                          type: "bar", // default type of chart
                          groups: [["data1", "data2"]],
                          colors: {
                            data1: colors["blue"],
                            data2: colors["pink"]
                          },
                          names: {
                            // name of each serie
                            data1: "Maximum",
                            data2: "Minimum"
                          }
                        }}
                        axis={{
                          x: {
                            type: "category",
                            // name of each category
                            categories: [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun"
                            ]
                          }
                        }}
                        legend={{
                          show: false //hide legend
                        }}
                        padding={{
                          bottom: 0,
                          top: 0
                        }}
                      />
                    }
                  />
                </Grid.Col>
              </Grid.Row>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col width={12}>
              <Card title="Invoices">
                <Table
                  responsive
                  className="card-table table-vcenter text-nowrap"
                >
                  <Table.Header>
                    <Table.ColHeader className="w-1">No.</Table.ColHeader>
                    <Table.ColHeader className="w-1">Date</Table.ColHeader>
                    <Table.ColHeader className="w-1">Supplier</Table.ColHeader>
                    <Table.ColHeader className="w-1">Total</Table.ColHeader>
                  </Table.Header>
                  <Table.Body>
                    {this.state.invoices &&
                      this.state.invoices.map(invoice => {
                        return (
                          <Table.Row>
                            <Table.Col>{invoice[0]}</Table.Col>
                            <Table.Col>{invoice[1]["invoiceDate"]}</Table.Col>
                            <Table.Col>
                              {invoice[1]["invoiceSupplier"]}
                            </Table.Col>
                            <Table.Col>{invoice[1]["invoiceTotal"]}</Table.Col>
                          </Table.Row>
                        );
                      })}
                  </Table.Body>
                </Table>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Page.Content>
      </SiteWrapper>
    );
  }
}

export default Home;
