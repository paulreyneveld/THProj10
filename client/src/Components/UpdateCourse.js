import React, { Component } from 'react';
import Form from './Form';
import ReactMarkdown from 'react-markdown';

export default class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      courseDetail: {},
      firstName: '',
      lastName: '',
      userID: '',
      errors: []
    };
  }

  componentDidMount() {
    const { context } = this.props;
    const courseId = this.props.match.params.id;
    context.data.courseDetail(courseId)
     .then(response => {
       console.log(response);
       this.setState({
        courseDetail: response,
        firstName: response.User.firstName,
        lastName: response.User.lastName,
        userId: response.User.userId,
       });
     })
     .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state.courseDetail;

    const errors = this.state.errors;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

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
                      defaultValue={title}
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
                      defaultValue={description}
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
                          defaultValue={estimatedTime}
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
                          defaultValue={materialsNeeded}
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

  /**
   * A function that takes the user's input values and assigns it to the appropriate state property
   * @param {string} event - The user's input values
   */
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

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
        console.log("Course created");
        this.props.history.push("/");
      }
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push("/error");
    });

    
  };

  cancel = () => {
    this.props.history.push("/");
  };
}