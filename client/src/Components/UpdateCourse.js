import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      firstName: '',
      lastName: '',
      userId: '',
      errors: []
    };
  }
  
  // Obtains relevant information from the API via context.
  componentDidMount() {
    const { context } = this.props;
    const courseId = this.props.match.params.id;
    context.data.courseDetail(courseId)
     .then(response => {
       this.setState({
        title: response.title,
        description: response.description,
        estimatedTime: response.estimatedTime,
        materialsNeeded: response.materialsNeeded,
        firstName: response.User.firstName,
        lastName: response.User.lastName,
        userId: response.User.id,
       });
     })
     .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
    }
  
  // Displays the update form via generic form component.
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      firstName,
      lastName,
      errors
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      onChange={this.change}
                      value={title}
                    />
                  </div>
                  <p>
                    By {firstName} {lastName}
                  </p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder="Course description..."
                      onChange={this.change}
                      value={description}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          onChange={this.change}
                          value={estimatedTime}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          className=""
                          placeholder="List materials..."
                          onChange={this.change}
                          value={materialsNeeded}
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  // Function that updates state when user's change the input.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // Function that wraps the updated state (course info) and sends it to the server for processing. 
  submit = () => {
    const { context } = this.props;
    const { 
        title, 
        description, 
        estimatedTime, 
        materialsNeeded 
    } = this.state;
    
    const userId = context.authenticatedUser.userId;
    const { emailAddress } = context.authenticatedUser;
    const password = context.password;
    const courseId = this.props.match.params.id;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
    .updateCourse(courseId, course, emailAddress, password)
    .then((errors) => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        console.log("Course updated");
        this.props.history.push("/");
      }
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push("/error");
    });
  };

  // Function that cancels the update and returns to the course detail page. 
  cancel = () => {
    const courseId = this.props.match.params.id;
    this.props.history.push(`/courses/${courseId}`);
  };
}