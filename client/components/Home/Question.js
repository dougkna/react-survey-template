import React, { Component } from 'react';
import { Radio, Checkbox, FormGroup, FormControl, Modal, Header, Footer, Title, Body, Button } from 'react-bootstrap';
import RadioType from '../QuestionType/RadioType';
import CheckboxType from '../QuestionType/CheckboxType';

export default class Question extends Component {
  render() {
    var QuestionComponent;
    const { question, picked_answers, handleAnswer } = this.props;
    //Check if question is already answered
    var user_ans = picked_answers[question._id] || [];

    switch(question.type) {
      case 'radio':
        QuestionComponent = RadioType;
        break;

      case 'multi':
        QuestionComponent = CheckboxType;
        break;

      default:
        break;
    }

    var questionType = <QuestionComponent
      question={question} 
      user_ans= {user_ans}
      handleAnswer={handleAnswer} 
      picked_answers={picked_answers}
    />;

    return (
      <div className='question'>
        <strong>{question.number}. {question.text}</strong>
        {questionType && 
          <div className='answer'>{questionType}</div>
        }
      </div>
    );
  }
}