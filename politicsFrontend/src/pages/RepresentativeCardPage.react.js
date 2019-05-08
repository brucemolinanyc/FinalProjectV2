import React from 'react'
import {
    Container,
    Grid,
    Card,
    Button,
    Form,
    Avatar,
    Profile,
    List,
    Media,
    Text,
    Comment,
  } from "tabler-react";
  
import SiteWrapper from "./SiteWrapper.react"
  
class RepresentativeCardPage extends React.Component{
    state = {
        bio: null,
        npat: null,
        ratings: null,
        votes: null,
        candidateId: null
    }

    componentDidMount = () => {
        const fullName = this.props.match.url.split("/").slice(-1).join(" ")
        const firstName = this.props.match.url.split(/[\s,"/"]+/)[2].trim()
        const lastName = this.props.match.url.split(" ").slice(-1).join(" ").trim()
        var candidateId = null
        console.log(fullName, firstName, lastName)
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
        return(
            <SiteWrapper>
            {console.log(this.state)}
            <div className="my-3 my-md-5">
              <Container>
                <Grid.Row>
                  <Grid.Col lg={4}>
                    <Profile
                      name={ this.state.bio && `${this.state.bio.bio.candidate.firstName} ${this.state.bio.bio.candidate.lastName}` }
                      backgroundURL="https://us.123rf.com/450wm/sharpner/sharpner1702/sharpner170200005/71130029-waving-american-flag.jpg?ver=6"
                      avatarURL={this.state.bio && this.state.bio.bio.candidate.photo}
                      twitterURL="test"
                    >
                      {}
                    </Profile>
                    <Card>
                      <Card.Body>
                        <Media>
                          <Avatar
                            size="xxl"
                            className="mr-5"
                            imageURL="demo/faces/male/21.jpg"
                          />
                          <Media.BodySocial
                            name="Place holder"
                            workTitle="add social media handles"
                            facebook="Facebook"
                            twitter="Twitter"
                            phone="1234567890"
                            skype="@skypename"
                          />
                        </Media>
                      </Card.Body>
                    </Card>
                    
                  </Grid.Col>
                  <Grid.Col lg={8}>
                    <Card>
                      <Card.Header>
                      test header
                      </Card.Header>
                      <Comment.List>
                        <Comment
                          avatarURL="demo/faces/male/16.jpg"
                          name="Peter Richards"
                          date="4 min"
                          text="Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                          replies={
                            <React.Fragment>
                              <Comment.Reply
                                name="Debra Beck"
                                avatarURL="demo/faces/female/17.jpg"
                                text="Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis."
                              />
                              <Comment.Reply
                                name="Jack Ruiz"
                                avatarURL="demo/faces/male/32.jpg"
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
                              />
                            </React.Fragment>
                          }
                        />
                        <Comment
                          avatarURL="demo/faces/male/16.jpg"
                          date="12 min"
                          name="Peter Richards"
                          text="Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis."
                        />
                        <Comment
                          avatarURL="demo/faces/male/16.jpg"
                          date="34 min"
                          name="Peter Richards"
                          text="Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."
                          replies={
                            <Comment.Reply
                              name="Wayne Holland"
                              avatarURL="demo/faces/male/26.jpg"
                              text=" Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis."
                            />
                          }
                        />
                      </Comment.List>
                    </Card>
                    
                    <Form className="card">
                      <Card.Body>
                        <Card.Title>Edit Profile</Card.Title>
                        <Grid.Row>
                          <Grid.Col md={5}>
                           
                          </Grid.Col>
                          <Grid.Col sm={6} md={3}>
                           
                          </Grid.Col>
                          <Grid.Col sm={6} md={4}>
                          
                          </Grid.Col>
                          <Grid.Col sm={6} md={6}>
                          
                          </Grid.Col>
                          <Grid.Col sm={6} md={6}>
                           
                          </Grid.Col>
                          <Grid.Col md={12}>
                           
                          </Grid.Col>
                          <Grid.Col sm={6} md={4}>
                           
                          </Grid.Col>
                          <Grid.Col sm={6} md={3}>
                         
                          </Grid.Col>
                          <Grid.Col md={5}>
                          
                          </Grid.Col>
                          <Grid.Col md={12}>
                           
                          </Grid.Col>
                        </Grid.Row>
                      </Card.Body>
                      <Card.Footer className="text-right">
                        <Button type="submit" color="primary">
                          Update Profile
                        </Button>
                      </Card.Footer>
                    </Form>
                  </Grid.Col>
                </Grid.Row>
              </Container>
            </div>
          </SiteWrapper>
            
        )
    }
}


export default RepresentativeCardPage;