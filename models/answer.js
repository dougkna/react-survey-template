var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  question_id: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  value: String,
  number: Number
}, { timestamps: { createdAt: 'created_at' } });

var Answer = mongoose.model("answer", answerSchema, "Answer");

module.exports = Answer;