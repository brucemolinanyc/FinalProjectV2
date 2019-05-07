import React from 'react';
import "tabler-react/dist/Tabler.css";
import { Table } from 'tabler-react'

const RepresentativesRow = (props) => (
    <Table.row>
        <Table.Col>
            {<img  height="100" width="100" src={props.official.photoUrl ? 
                props.official.photoUrl : "https://us.123rf.com/450wm/sharpner/sharpner1702/sharpner170200005/71130029-waving-american-flag.jpg?ver=6"}>
            </img>} 
            <br></br>
            {props.specificOfficialName && props.specificOfficialName}
            ({props.official.party && props.official.party.slice(0,1) === "R" ? <font color="red">R</font> : <font color="blue">D</font>})
        </Table.Col>

        <Table.Col>
        test
        </Table.Col>
        
        <Table.Col>
        test
        </Table.Col>

        <Table.Col>
        test
        </Table.Col>

  </Table.row>
)

export default RepresentativesRow;