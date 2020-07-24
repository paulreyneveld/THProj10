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
          userID: ''
        };
    }

    componentDidMount() {
        const idParam = this.props.match.params.id;
        axios.get(`http://localhost:5000/api/courses/${idParam}`)
        .then(response => {
            this.setState({
              courseDetail: response.data,
              firstName: response.data.User.firstName,
              lastName: response.data.User.lastName,
              userId: response.data.User.userId
            }); 
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    }


    render() {
        const courseObject = this.state.courseDetail;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        
        return (
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span>
            <a className="button" href="update-course.html">Update Course</a>
            <a className="button" href="#">Delete Course</a></span>
            <Link to="/courses" className="button button-secondary">Return to List</Link>
            </div>
          </div>
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
}

export default CourseDetail;