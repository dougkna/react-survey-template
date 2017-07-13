var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Answer = require('./answer');
var questionSchema = new Schema({
  survey_name: { type: String, ref: 'Survey' },
  number: Number,
  type: String, 
  text: String,
  version: Number,
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
}, { timestamps: { createdAt: 'created_at' } });


var Question = mongoose.model("question", questionSchema, "Question");

module.exports = Question;