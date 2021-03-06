import React, { Component } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

export class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    // Displays user sign in form.
    render() {
        const {
            emailAddress,
            password,
            errors,
          } = this.state;

        return (
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                <Form 
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Sign In"
                  elements={() => (
                    <React.Fragment>
                      <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="text"
                        value={emailAddress}
                        onChange={this.change} 
                        placeholder="Email Address" />
                      <input 
                        id="password" 
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.change} 
                        placeholder="Password" />                
                    </React.Fragment>
            )} />
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
    
    // Function that updates state when users change the input.
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    // Function that wraps the updated and validated state and uses is to obtain
    // user authorization. 
    submit = () => {
      const { context } = this.props;
      const { from } = this.props.location.state || {
        from: { pathname: "/" },
      };
      const { emailAddress, password } = this.state;

      if (emailAddress === '' || password === '') {
        this.setState(() => {
          return { errors: [ 'Sign-in was unsuccessful' ]};
        })
      } else {
        context.actions.signIn(emailAddress, password)
        .then(user => {
            if (user === null) {
                this.setState(() => {
                    return { errors: [ 'Sign-in was unsuccessful' ]};
                });
            } else {
                this.props.history.push(from);
            }
        })
        .catch( err => {
            console.log(err);
            this.props.history.push('/error');
        })
      }
    }

    // Function that cancels the update and returns to the main page. 
    cancel = () => {
      this.props.history.push('/');
    }
}

export default UserSignIn;