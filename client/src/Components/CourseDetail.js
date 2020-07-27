import React, { Component } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';


// import Photo from './Photo'

export class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
          courseDetail: {},
          firstName: '',
          lastName: '',
          userId: ''
        };
    }

    componentDidMount() {
      const { context } = this.props;
      const courseId = this.props.match.params.id;
      context.data.courseDetail(courseId)
       .then(response => {
         this.setState({
          courseDetail: response,
          firstName: response.User.firstName,
          lastName: response.User.lastName,
          userId: response.User.userId
         });
       })
       .catch((err) => {
          console.log(err);
          this.props.history.push("/error");
        });
    }

    render() {

        const courseObject = this.state.courseDetail;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;

        return (
        <div>
        <div className="actions--bar">
          {this.menuPermissions()}
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseObject.title}</h3>
              <p>By {`${firstName} ${lastName}`} </p>
            </div>
            <div className="course--description">
                <ReactMarkdown>{courseObject.description}</ReactMarkdown>           
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseObject.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown>{courseObject.materialsNeeded}</ReactMarkdown>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
         </div>
        );
    }

    menuPermissions = () => {
      const { context } = this.props;
      const authUser = context.authenticatedUser;
      const courseId = this.props.match.params.id;


      if (authUser != null) {
        const courseOwner = this.state.courseDetail.userId;
        const userLoggedIn = authUser.userId;
        if (courseOwner == userLoggedIn) {
          return(
            <div className="bounds">
            <div className="grid-100">
            <span>
            <Link to={`/courses/${courseId}/update`}className="button">Update Course</Link>
            <button className="button" onClick={this.deleteCourse}>Delete Course</button>
            </span>
            <Link to="/courses" className="button button-secondary">Return to List</Link>
            </div>
          </div>
          )
        } else {
          return (
            <div className='actions--bar'>
            <div className='bounds'>
              <div className='grid-100'>
                <span>
                <Link to={'/'} className='button button-secondary' >Return to List</Link>
                </span>
              </div>
            </div>
          </div>
          )
        }
      } else {
        return (
          <div className='actions--bar'>
          <div className='bounds'>
            <div className='grid-100'>
              <span>
              <Link to={'/'} className='button button-secondary' >Return to List</Link>
              </span>
            </div>
          </div>
        </div>
        )
      }
    }

    deleteCourse = () => {
      const { context } = this.props;
      const emailAddress = context.authenticatedUser.emailAddress;
      const password = context.password;
      const courseId = this.props.match.params.id

      context.data
      .deleteCourse(courseId, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("Course Deleted");
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
    }
    
}

export default CourseDetail;