import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { Alert, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Button, HelpBlock} from 'react-bootstrap';

export default class Signup extends Component {
	state = {
		first_name: '',
		email: '',
		password: ''
	};

  getValidationStateName() {
    if (/^[a-zA-Z,.'-]+$/.test(this.state.first_name)) return 'success';
    else if (this.state.first_name.length) return 'error';
  }

  getValidationStateEmail() {
    if (/[a-zA-Z0-9]+@\S+\.\S+/.test(this.state.email)) return 'success';
    else if (this.state.email.length) return 'error';
  }

  getValidationStatePassword() {
    if (this.state.password.length == 0) return;
    else if (this.state.password.length >= 4) return 'success'; 
    else return 'error';
  }

  handleChange = (e) => {
      this.setState({ [e.target.name] : e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    jQuery.ajax({
      method: "POST",
      url: '/signup',
      data: this.state,
      success: (result) => {
        this.props.approveLogin(result);
      },
      error: (err) => {
        alert(err.responseText);
      }
    });
  };

  render() {
    return (
      <Form horizontal method="post" onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationStateName()}
        >
          <Col smOffset={2} sm={10} className='auth-text'>Create Account</Col>
          <Col smOffset={2} sm={10}>
            <FormControl
              type="text"
              value={this.state.first_name}
              placeholder="Enter First Name"
              name="first_name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback/>
          </Col>
        </FormGroup>

        <FormGroup 
          controlId="formHorizontalEmail" 
          validationState={this.getValidationStateEmail()}
        >

          <Col smOffset={2} sm={10}>
            <FormControl 
              type="email" 
              value={this.state.email} 
              placeholder="Enter Email" 
              name="email" 
              onChange={this.handleChange}
            />
            <FormControl.Feedback/>
          </Col>
        </FormGroup>

        <FormGroup 
          controlId="formHorizontalPassword" 
          validationState={this.getValidationStatePassword()}
        >

          <Col smOffset={2} sm={10}>
            <FormControl 
              type="password" 
              value={this.state.password} 
              placeholder="Enter Password (min 4 char)" 
              name="password" 
              onChange={this.handleChange}/>
            <FormControl.Feedback/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button style={{width:"100%"}} bsStyle='primary' type="submit">
              Sign Up
            </Button>
          </Col>
        </FormGroup>

      </Form>
    );
  }
}

