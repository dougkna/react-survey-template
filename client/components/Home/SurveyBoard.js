import React, { Component } from 'react';
import { Modal, Header, Footer, Title, Body, Button } from 'react-bootstrap';
import Question from './Question';

export default class SurveyBoard extends Component {
  constructor() {
    super();
    this.state = {
      picked_answers: {},
      surveyArray: [],
      totalQuestions: 0,
      complete: false
    };
  }

  componentWillMount() {
    if (this.props.survey_status === 'pending') {
      this.retrieveUserAnswers(this.props.user_id);
    } else {
      this.getSurvey();
    }
  }

  //Fetch most recent published survey from DB
  getSurvey = (user_id) => {
    jQuery.ajax({
      method: "GET",
      url: '/getSurvey',
      success: (result) => {
        if (typeof result == 'object') {
          this.setState({ surveyArray: result, totalQuestions: result.length});
          this.props.openModal();
        } else {
          this.props.closeModal();
        }
      },
      error: (err) => {
        console.log(err.responseText);
      }
    });
  };

  //Retrieve user's existing answers from DB
  retrieveUserAnswers = (id) => {
    jQuery.ajax({
      method: "GET",
      url: '/retrieveUserAnswers',
      data: {user_id: id},
      success: (result) => {
        this.setState({ picked_answers: result });
      },
      error: (err) => {
        console.log('Error in retrieving answers', err);
      }
    }).then(this.getSurvey());
  };

  //Save user's answers to DB
  saveUserAnswers = (e) => {
    this.updateSurveyStatus(e);
    jQuery.ajax({
      method: "POST",
      url: '/saveUserAnswers',
      data: {
        picked_answers: JSON.stringify(this.state.picked_answers),
        user_id: this.props.user_id
      },
      success: (result) => {
        this.props.closeModal();
      },
      error: (err) => {
        console.log('Error in saving answers', err);
      }
    });
  };

  //If user saves or declines survey, update user's status
  updateSurveyStatus = (e) => {
    jQuery.ajax({
      method: "POST",
      url: '/updateSurveyStatus',
      data: {user_id: this.props.user_id, survey_status: e.target.value},
      error: (err) => {
        console.log('Error in updating survey status', err);
      }
    });
    if (e.target.value === "retired") this.props.closeModal();
  };

  //Hash user's answers to picked_answers (key: question_id, value: answer_id)
  handleAnswer = (picked_answers) => {
    this.setState({ picked_answers });

    //If user's answers
    if (Object.keys(picked_answers).length === this.state.totalQuestions
      && Object.keys(picked_answers)
      .filter((key) => picked_answers[key].length > 0)
      .length === this.state.totalQuestions
    ) {
      this.setState({ complete : true });
    } else {
      this.setState({ complete : false });
    }
  };

  render() {
    return(
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Please take our survey!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='survey-form'>
            {this.state.surveyArray.map((q, i) => (
              <Question
                key={i}
                user_id={this.props.user_id}
                question={q}
                picked_answers={this.state.picked_answers}
                handleAnswer={this.handleAnswer}
              />
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" style={{float: 'left'}} value="retired" 
                  onClick={this.updateSurveyStatus}>Decline Survey
          </Button>
          {!this.state.complete && 
            <Button bsStyle="primary" value="pending" 
                  onClick={this.saveUserAnswers}>Save & Close
            </Button>
          }
          {this.state.complete && 
            <Button bsStyle="primary" value="complete" 
                  onClick={this.saveUserAnswers}>Complete Survey
            </Button>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}
