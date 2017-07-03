import React, { Component } from 'react';
import { Radio, Checkbox, FormGroup, FormControl, Modal, Header, Footer, Title, Body, Button } from 'react-bootstrap';

export default class RadioType extends Component {
  handleRadioAnswer = (question_id, answer_id) => {
    var picked_answers = this.props.picked_answers;
    picked_answers[question_id] = answer_id;
    this.props.handleAnswer(picked_answers);
  };

  render() {
    const { answers_value, answers_id, _id } = this.props.question;

    return(
      <FormGroup>
        {answers_value.map((ans, j) =>
          <Radio  
            key={j} 
            value={answers_id[j]}
            name={"radioGroup "+_id}
            onClick={() => this.handleRadioAnswer(_id, answers_id[j])}
            defaultChecked={this.props.user_ans.indexOf(answers_id[j]) >= 0}
            inline
          >
            {ans}
          </Radio>
        )}
      </FormGroup>
    );
  }
}
