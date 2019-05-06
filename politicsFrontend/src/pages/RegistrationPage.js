import React from 'react'
import { Formik } from "formik";
import {Link} from 'react-router-dom'
import { LoginPage as TablerLoginPage } from "tabler-react";
import './LoginPage.react.css'


class RegistrationPage extends React.Component{
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
          password: "",
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
          fetch("http://127.0.0.1:5000/create", {
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
              localStorage.setItem('token', data['auth_token'])
            
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
          <p className="login"><strong>Already registered? <Link to="/">Login</Link>

          </strong></p>
          </div>
         
        )
      }
      />
    );
  }
}



export default RegistrationPage;