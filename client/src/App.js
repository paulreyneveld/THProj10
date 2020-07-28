import React, { Component } from 'react';
import './global.css';
import './index.css';

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
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import Authenticated from './Components/Authenticated';
import NotFound from './Components/NotFound';

// Import for sharing state across the app.
import withContext from './Context';

// Import requiring user auth for certain routes. 
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);

export class App extends Component {

render() {
  return (
  <BrowserRouter>
    <div className="App">
    <HeaderWithContext /> 
    <Switch>
      <Route exact path="/" render={ () => 
        <Redirect to="/courses" />
      }/>
      <Route exact path="/courses" component={CoursesWithContext}/>
      <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
      <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
      <Route path="/courses/:id" component={CourseDetailWithContext} />
      <Route exact path="/signin" component={UserSignInWithContext} />
      <Route path="/signup" component={UserSignUpWithContext} />
      <Route path="/signout" component={UserSignOutWithContext} />
      <Route path="/authenticated" component={AuthWithContext} />
      <Route component={NotFound} />


    </Switch>
    </div>
    </BrowserRouter>
  );
 }
}


export default App;
