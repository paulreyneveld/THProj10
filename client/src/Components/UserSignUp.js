import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';


export class UserSignUp extends Component {
    state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      errors: [],
    }

    // Displays a user sign up form via generic form component. 
    render() {
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        errors
      } = this.state;

        return (
            <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              <div>
                <Form 
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Sign Up"
                  elements={() => (
                  <React.Fragment>
                   <div>
                    <input 
                      id="firstName" 
                      name="firstName" 
                      type="text"
                      value={firstName} 
                      onChange={this.change} 
                      placeholder="First Name" />
                    </div> 
                    <div>
                    <input 
                      id="lastName" 
                      name="lastName" 
                      type="text"
                      value={lastName} 
                      onChange={this.change} 
                      placeholder="Last Name" />
                    </div> 
                    <div>
                    <input 
                      id="emailAddress" 
                      name="emailAddress"
                      type="text"
                      value={emailAddress} 
                      onChange={this.change} 
                      placeholder="Email Address" />
                    </div> 
                    <div>
                    <input 
                      id="password" 
                      name="password"
                      type="password"
                      value={password} 
                      onChange={this.change} 
                      placeholder="Password" />
                    </div> 
                    <div>
                    <input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword} 
                      onChange={this.change} 
                      placeholder="Confirm Password" />
                    </div> 
                  </React.Fragment>
              )} />
              </div>
              <p>&nbsp;</p>
              <p>Already have a user account? <Link to="/signin"> Click here </Link>to sign in!</p>
            </div>
          </div>
        )
    }

    // Function that updates state when user's change the input.
    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }

    // Function that wraps the updated state (new user info) and sends it to the server for processing.
    submit = () => {
      const { context } = this.props;

      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      } = this.state;
  
      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      };
      if (password === confirmPassword) {
        context.data.createUser(user)
          .then( errors => {
            if (errors.length) {
              this.setState({ errors });
            } else {
              context.actions.signIn(emailAddress, password)
               .then(() => {
                 this.props.history.push('/');
               });
            }
          })
          .catch((err) => {
            console.log(err);
            this.props.history.push('/error');
          });
      } else {
        this.setState({ errors: ['Confirm password does not match "password"'] });

      }
        
    }
    // Function that cancels the update and returns to the main page.
    cancel = () => {
      this.props.history.push('/');
    }
}

export default UserSignUp;