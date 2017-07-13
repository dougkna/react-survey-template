var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surveySchema = new Schema({
  published: Boolean,
  name: { type: String, unique: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: { createdAt: 'created_at' } });

surveySchema.statics = {
  populateFromLatest: function(name) {
    this.findOne({ name: name })
    .where({ published: true })
    .populate('questions')
    .exec(function(err, survey) {
      return survey
    });
  }
}

var Survey = mongoose.model("survey", surveySchema, "Survey");

module.exports = Survey;