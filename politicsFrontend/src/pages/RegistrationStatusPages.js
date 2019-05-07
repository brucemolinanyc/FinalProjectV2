import React from 'react';



const FormSuccess = () => (
    <div className="success"> 
        <h1>Voter Information Found!</h1>
        <p>You are registered to vote in New York State!</p>
    </div>
)

const FormFailure = () => (
    <div className="failure"> 
        <h1>Information Not Found!</h1>
        <p>Your information was not found at this address but you may be registered elsewhere - 
        Please <strong><a href="https://www.elections.ny.gov/VotingRegister.html" target="blank">click here </a></strong> 
        to register your current address.</p>    
    </div>
)


export {FormSuccess, FormFailure}