import React, { Component } from 'react';
import Navigator from './Navigator';
import Login from './Login';
import Signup from './Signup';
import SurveyBoard from './SurveyBoard';
import { Col } from 'react-bootstrap';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: '',
      user_id: '',
      survey_status: '',
      showModal: false
    };
  }

  componentWillMount() {
    jQuery.ajax({
      method: "GET",
      url: '/getUser',
      success: (result) => {
        if (result._id) this.approveLogin(result); 
      }
    });
  }

  approveLogin = (user) => {
    this.setState({ 
      loggedIn: true, 
      username: user.first_name,
      user_id: user._id,
      survey_status: user.survey_status
    });
  };

  logout = (e) => {
    jQuery.ajax({
      method: "GET",
      url: '/logout',
      success: (result) => {
        this.setState({ 
          loggedIn: false,
          username: '',
          user_id: '',
          survey_status: ''
        });   
      }
    });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className='main'>
        <Navigator
          loggedIn={this.state.loggedIn}
          logout={this.logout} 
        />

        {!this.state.loggedIn && 
          <div className='auth'>
            <Col sm={6} className='login'>
              <Login 
                approveLogin={this.approveLogin} 
              />
            </Col>
            <Col sm={6} className='signup'>
              <Signup
                approveLogin={this.approveLogin} 
              />
            </Col>
          </div>
        }

        {this.state.loggedIn &&
          <SurveyBoard 
            user_id={this.state.user_id} 
            survey_status={this.state.survey_status}
            surveyArray={this.state.surveyArray}
            showModal={this.state.showModal}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        }
      </div>
    );
  }
}




