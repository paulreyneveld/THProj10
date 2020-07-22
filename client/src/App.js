import React, { Component } from 'react';
import './global.css';
import './index.css';
import axios from 'axios';

// Routing import
import {
  BrowserRouter,
  Route, 
  Switch,
  Redirect,   
} from 'react-router-dom';

// Component imports
import Header from './Components/Header';
import Courses from './Components/Courses';
import Course from './Components/Course';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import Authenticated from './Components/Authenticated';

// Context for sharing state across the app

import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);

export class App extends Component {

render() {
  return (
  <BrowserRouter>
    <div className="App">
    <Header /> 
    <Switch>
      <Route exact path="/" render={ () => 
        <Redirect to="/courses" />
      }/>
      <Route exact path="/courses" component={Courses}/>
      <Route exact path="/courses/create" component={CreateCourse} />
      <Route path="/courses/:id/update" component={UpdateCourse} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route exact path="/signin" component={UserSignInWithContext} />
      <Route path="/signup" component={UserSignUpWithContext} />
      <Route path="/authenticated" component={Authenticated} />

    </Switch>
    </div>
    </BrowserRouter>
  );
 }
}


export default App;
