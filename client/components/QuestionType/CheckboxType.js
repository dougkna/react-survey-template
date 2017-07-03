import React, { Component } from 'react';
import { Radio, Checkbox, FormGroup, FormControl, Modal, Header, Footer, Title, Body, Button } from 'react-bootstrap';

export default class CheckboxType extends Component {
  handleCheckboxAnswer = (question_id, answer_id) => {
    var picked_answers = this.props.picked_answers;
    if (picked_answers[question_id]) {
      var prevAns = picked_answers[question_id];
      prevAns.indexOf(answer_id) >= 0 
        ? prevAns.splice(prevAns.indexOf(answer_id), 1) 
        : prevAns.push(answer_id)
    } else {
      picked_answers[question_id] = [answer_id];
    }
    this.props.handleAnswer(picked_answers);
  };

  render() {
    const { answers_value, answers_id, _id } = this.props.question;

    return(
      <FormGroup>
        {answers_value.map((ans, j) =>
          <Checkbox 
            key={j} 
            id={j} 
            name={"checkboxGroup "+_id} 
            onClick={() => this.handleCheckboxAnswer(_id, answers_id[j])}
            defaultChecked={this.props.user_ans.indexOf(answers_id[j]) >= 0}
            inline
          >
            {ans}
          </Checkbox>
        )}
      </FormGroup>
    );
  }
}
