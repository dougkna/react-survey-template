var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userAnswerSchema = new Schema({
  question_id: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer_id : {
    type: Schema.Types.Mixed,
    ref: 'Answer' 
  },
  user_id : {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
}, { timestamps: { createdAt: 'created_at' } });

var UserAnswer = mongoose.model("userAnswer", userAnswerSchema, "UserAnswer");

module.exports = UserAnswer;