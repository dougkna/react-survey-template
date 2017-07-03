var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surveySchema = new Schema({
  published: Boolean,
  name: {type: String, unique: true}
}, { timestamps: { createdAt: 'created_at' } });

var Survey = mongoose.model("survey", surveySchema, "Survey");

module.exports = Survey;