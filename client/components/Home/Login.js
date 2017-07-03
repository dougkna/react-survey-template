import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Button, Badge} from 'react-bootstrap';

export default class Login extends Component{
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			error: false,
		}
	}

	login(email, password) {
		this.authenticate(email, password, (res) => {
			if (res.authenticated) {
				this.props.approveLogin(res);
        this.setState({ error: false });
			}
		});
	}

	authenticate(email, password, cb) {
		jQuery.ajax({
			method: "GET",
			url: '/login',
			data: this.state,
			success: (result) => {
				cb({
					authenticated: true,
					first_name: result.first_name,
          _id: result._id,
          survey_status: result.survey_status
				});
			},
			error: (err) => {
        this.setState({ error: true });
				cb({ authenticated: false });
			}
		});
	}

  handleSubmit = (e) => {
    e.preventDefault()
    const email = this.state.email;
    const password = this.state.password;
    this.login(email, password);
  };

	handleChange = (e) => {
		this.setState({ [e.target.name] : e.target.value });
	};

	render() {
		return (
			<div className='login'>
			  <Form className="login" horizontal onSubmit={this.handleSubmit}>
			    <FormGroup controlId="formHorizontalUsername">
			      <Col componentClass={ControlLabel} sm={3}>
			        Email
			      </Col>
			      <Col sm={8}>
			        <FormControl value={this.state.email} name="email" onChange={this.handleChange}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formHorizontalPassword">
			      <Col componentClass={ControlLabel} sm={3}>
			        Password
			      </Col>
			      <Col sm={8}>
			        <FormControl type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
			      </Col>
			    </FormGroup>
		    	{this.state.error && (
        		<Col smOffset={3}><Badge>Wrong email or password.</Badge></Col>
      		)}

			    <FormGroup>
			      <Col smOffset={3} sm={8}>
			        <Checkbox>Remember me</Checkbox>
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col smOffset={3} sm={8}>
			        <Button style={{width:"100%"}} bsStyle='primary' type="submit">
			          Sign In
			        </Button>
			      </Col>
			    </FormGroup>
			  </Form>
	  	</div>
  	);
	}
}

