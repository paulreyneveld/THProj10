import React, { Component } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

export class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      courseDetail: {},
      firstName: '',
      lastName: '',
      userID: ''
    };
}
   render() {
      const courseObject = this.state.courseDetail;
      const firstName = this.state.firstName;
      const lastName = this.state.lastName;

        return (
          <div className="bounds course--detail">
          <h1>Update Course</h1>
          </div>
        );
    }
}
export default UpdateCourse;