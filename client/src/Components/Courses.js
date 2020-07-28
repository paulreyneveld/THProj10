import React, { Component } from 'react';
import Course from './Course';
import { Link } from 'react-router-dom';

export class Courses extends Component {

    constructor() {
        super();
        this.state = {
          courses: []
        };
    }

   componentDidMount() {
    const { context } = this.props;
    context.data.getCourses()
     .then(response => {
       this.setState({
         courses: response.courses
       });
     })
     .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  }

   render() {

    const results = this.state.courses;
    const courses = results.map(course => 
        <Course 
        key={course.id}
        id={course.id}
        title={course.title} 
        />
    );

    return (
          <div className="bounds">
            {courses}
            <div className="grid-33">
            <Link to="/courses/create" className="course--module course--add--module">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                  </svg>New Course</h3>
            </Link></div>
          </div>
    );
  }
}

export default Courses;


