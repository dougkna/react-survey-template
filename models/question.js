var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  survey_name: String,
  number: Number,
  type: String, 
  text: String,
  version: Number
}, { timestamps: { createdAt: 'created_at' } });

var Question = mongoose.model("question", questionSchema, "Question");

module.exports = Question;