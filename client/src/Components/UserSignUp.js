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

    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }

    submit = () => {
      const { context } = this.props;
      console.log(context);
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      } = this.state;
  
      // Create user
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
              console.log(`${emailAddress} is successfully signed up and authenticated`);
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

    cancel = () => {
      this.props.history.push('/');
    }
}

export default UserSignUp;