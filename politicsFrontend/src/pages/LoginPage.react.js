import React from 'react'
import { Formik } from "formik";
import { LoginPage as TablerLoginPage } from "tabler-react";
import './LoginPage.react.css'

class LoginPage extends React.Component{
  constructor(){
    super()

    this.state = {
      email: "",
      password: ""
    }
  } 

  render(){
    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validate={values => {
          // same as above, but feel free to move this into a class method now.
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(
          values,
          { setSubmitting, setErrors /* setValues and other goodies */ }
        ) => {
          fetch("http://127.0.0.1:5000/login", {
            method: "post",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password
            })
          }).then(response => response.json())
          .then(data => {
            if (data.auth_token){
              localStorage.setItem('token', data['auth_token'])
          } else {
            this.setState({loginError: false})
        }

        if(!!localStorage.token) {
          this.props.history.push('/home')
        }     
      })
    }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <div>
          <TablerLoginPage
          onSubmit={handleSubmit}
          onChange={handleChange}
          onBlur={handleBlur}
          values={values}
          errors={errors}
          touched={touched}
        />
          <p className="login"><strong>Need an account? <a href="/register">Register</a>
          </strong></p>
          </div>
       
          
        )
      }
      />
    );
  }
}



export default LoginPage;