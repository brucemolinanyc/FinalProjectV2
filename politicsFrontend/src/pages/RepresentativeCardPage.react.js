import React from 'react'
import {Container,Grid,Card,Avatar,Profile,Media} from "tabler-react";
import {Link} from 'react-router-dom';
import SiteWrapper from "./SiteWrapper.react";
  
class RepresentativeCardPage extends React.Component{
    state = {
        bio: null,
        npat: null,
        ratings: null,
        votes: null,
        candidateId: null,
        social: null
    }

    componentDidMount = () => {
        this.setState({social: this.props.location.state.social.channels})

        const fullName = this.props.match.url.split("/").slice(-1).join(" ")
        const firstName = this.props.match.url.split(/[\s,"/"]+/)[2].trim()
        const lastName = this.props.match.url.split(" ").slice(-1).join(" ").trim()
        var candidateId = null
        const candidate = fetch(`http://api.votesmart.org/Officials.getByLastname?key=e6c9d393d6cf259456bcb71e26922bcd&lastName=${lastName}&o=JSON`,{
            method: 'get',
            mode: "cors",
        })
        .then(response => response.json()) 
        .then(data => {
            // getting the candidateId for a person
            if(Array.isArray(data.candidateList.candidate)){
                candidateId = data.candidateList.candidate.filter( (el) => 
                (el.firstName === firstName)||(el.nickName === firstName))[0].candidateId
                this.setState({candidateId: candidateId})
            } else {
                candidateId = data.candidateList.candidate.candidateId
                this.setState({candidateId: candidateId})
            }
            fetch(`http://api.votesmart.org/CandidateBio.getDetailedBio?key=e6c9d393d6cf259456bcb71e26922bcd&candidateId=${this.state.candidateId}&o=JSON`, {
                method: 'get',
                mode: 'cors'
            }).then(response => response.json())
            .then(bio => this.setState({bio:bio}))
            fetch(`http://api.votesmart.org/Npat.getNpat?key=e6c9d393d6cf259456bcb71e26922bcd&candidateId=${this.state.candidateId}&o=JSON`, {
                    method: 'get',
                    mode: 'cors'
                })  // getting the candidates npat
                .then(response => response.json())
                .then(npat => this.setState({npat:npat}))
            fetch(`http://api.votesmart.org/Rating.getCandidateRating?key=e6c9d393d6cf259456bcb71e26922bcd&candidateId=${this.state.candidateId}&o=JSON`, {
                    method: 'get',
                    mode: 'cors'
                })   //getting the candidates ratings
                .then(response => response.json())
                .then(ratings => this.setState({ratings:ratings})
            )
            fetch(`http://api.votesmart.org/Votes.getByOfficial?key=e6c9d393d6cf259456bcb71e26922bcd&candidateId=${this.state.candidateId}&o=JSON`, {
                method: 'get',
                mode: 'cors'
            })
                .then(response => response.json())
                .then(votes => this.setState({votes:votes}))
        } 
        )
    }

    render(){
      const social = this.state.social !== null && this.state.social.filter( el => {return el.type == "Facebook" || el.type =="Twitter"}).map((el)=> {return el.id})
      const votes = this.state.votes !== null && this.state.votes.bills.bill.slice(0,10)
      const vote_results = votes && votes.map( (el) => {
        return <li> Bill #: {el.billNumber} -  Title: {el.title} - Stage: {el.stage} - <strong>Vote: {el.vote == "Y" ? 
        <font color="green">Yay</font>:<font color="red">Nay</font>}</strong> </li>
      })
      const environment = this.state.npat && this.state.npat.npat.section[9]
      const repro_rights =  this.state.npat && this.state.npat.npat.section[10]
      const gun_rights = this.state.npat && this.state.npat.npat.section[11]
      // console.log(this.state.npat && this.state.npat.npat.section[11].row.row)
      const enviro_positions = environment && environment.row.row.map( (el) =>{
        return <li>{el.rowText} <strong>{el.optionText.includes("Support") ? <font color="green">{el.optionText}</font>:<font color="red">{el.optionText}</font>}</strong></li>
    })
      const  repro_positions = repro_rights && repro_rights.row.row.map( (el) =>{
        return <li>{el.rowText} <strong>{el.optionText.includes("Support") ? <font color="green">{el.optionText}</font>:<font color="red">{el.optionText}</font>}</strong></li>
      })

      const gun_positions = gun_rights && gun_rights.row.row.map( (el) => {
        console.log(el.rowText, el.optionText)
        return <li>{el.rowText} <strong>{el.optionText.includes("Support") ? <font color="green">{el.optionText}</font>:<font color="red">{el.optionText}</font>}</strong></li>
      })

      return(
            <SiteWrapper>
            <div className="my-3 my-md-5">
              <Container>
                
              <Grid.Row className="text-left">
                  <Grid.Col lg={4}>
                    <Profile 
                      name={ 
                        this.state.bio && `${this.state.bio.bio.candidate.firstName} ${this.state.bio.bio.candidate.lastName}         
                      ${this.state.bio.bio.office.parties} - ${this.state.bio.bio.office.title}`  }  
                      backgroundURL="https://us.123rf.com/450wm/sharpner/sharpner1702/sharpner170200005/71130029-waving-american-flag.jpg?ver=6"
                      avatarURL={this.state.bio && this.state.bio.bio.candidate.photo}
                    >
                      {}
                    </Profile>
                    <Card>
                      <Card.Body>
                       <h3>Social Media</h3>
                      <Avatar size="sm" imageURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAY1BMVEU6WJ7///9ofbM1VJz8/f8dRpYaRJXw8vcpTJlsf7PByd4lSpjT2ejX3OswUZs3Vp21vdafq8vi5/E7W6AAMI5cda8AOJDIz+KElL+8xdxOaanO1OV7jLutt9P09vqZpslTbqtIxEtAAAABhUlEQVR4nO3by07DMBBA0UJoCQQSKJQ3hf//SgQU1S6O1Vkli3NWWY6urCi2nMUCAAAAAAAAAAAAAAAAAACgaBiGZm/qaeas6dv2ZXOxp9aYpvv8eD3fnp3sraaeaa7azWPaSayK7uOwlFhjuvdCK7GK+rdSK7FKhnYr1rH6p2IrsUraV7GOtvz30SDWqKHcSqyC5jNvtL76dd1OPdkMNadZq5v+z9SDzdFBrH6YeqA5y2OdLaeeZ9YOYnmt11hZAWIFiBUg1nFWPzZZrPvVjmqZ1cg+Z0etVD3WVqxUPda6m3q+WanHurKRTtVjXYqVqse6ceyQqse6FStVj/UkVqoey8WQTD3Wi1PAVLe+/rbOGj1f/npciJXpvi3zveFDu6NVgVOHALECxAoQK0CsALECxAoQK0CsALECxAoQK0CsALECxAoQK0CsALECxAoQK0CsALECxAoQK0CsALECxAoQK+Dgf0OxaprT7XnChe66u5FnAAAAAAAAAAAAAAAAAAAAor4AqDkOTOwer3IAAAAASUVORK5CYII=" /> <a href={`http://www.facebook.com/${social[0]}`} target="_blank">Facebook</a> &nbsp;
                      <Avatar size="sm" imageURL="https://seeklogo.com/images/T/twitter-2012-negative-logo-5C6C1F1521-seeklogo.com.png" /> <a href={`http://www.twitter.com/${social[1]}`} target="_blank">Twitter</a>

                 
                
                      </Card.Body>
                    </Card>
                    
                  </Grid.Col>
                  <Grid.Col lg={8}>
                    <Card>
                      <Card.Header>
                      Personal Information
                      </Card.Header>

                      <Card.Body className="bio">
                        {this.state.bio && <p> Birthdate: {this.state.bio.bio.candidate['birthDate']}</p>}
                        {this.state.bio && <p>Birthplace: {this.state.bio.bio.candidate['birthPlace']}</p>}
                        {this.state.bio && <p>Family: {this.state.bio.bio.candidate['family']}</p>}
                        {this.state.bio && <p>School: {this.state.bio.bio.candidate.education.institution.map( (el) => {
                          return (el['fullText'] + "\n") }
                          )}</p>
                        }
                        </Card.Body>
                    </Card>
                    
                    <Card className="card">
                    <Card.Header>
                      Recent Votes
                    </Card.Header>   
                      <Card.Body>               
                        <Grid.Row>
                            <Grid.Col md={12}>
                                {vote_results && vote_results[0]}
                              </Grid.Col>
                              <Grid.Col md={12}>
                              {vote_results && vote_results[1]}
                            </Grid.Col><Grid.Col md={12}>
                            {vote_results && vote_results[2]}
                          </Grid.Col><Grid.Col md={12}>
                          {vote_results && vote_results[3]}
                        </Grid.Col><Grid.Col md={12}>
                        {vote_results && vote_results[4]}
                      </Grid.Col>
                          
                        </Grid.Row>
                      </Card.Body>
                    </Card>
                  </Grid.Col>
                </Grid.Row>



                <Grid.Row cards deck>
                  <Grid.Col md={4}> 
                    <Card
                      title="Recent Reproductive Rights Positions"
                      body={ repro_positions && repro_positions }
                      />  
                  </Grid.Col>
                  
                  <Grid.Col md={4}>
                      <Card
                      title="Recent Gun Control Positions"
                      body={gun_positions && gun_positions}
                      />
                    </Grid.Col>
                  
                  <Grid.Col md={4}>
                    <Card
                    title="Recent Environmental Positions"
                    body={enviro_positions && enviro_positions}
                    />                
                  </Grid.Col>
              </Grid.Row>       
              {console.log(this.state)}      
                </Container>
            </div>

            
          </SiteWrapper>
            
        )
    }
}


export default RepresentativeCardPage;