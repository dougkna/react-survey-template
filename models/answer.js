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


answerSchema.methods = {
  getAllAnswers: function(q_id, cb) {
    this.constructor.find({question_id: q_id}, function(err, answers) {
      if (err) cb(err)
      else cb(answers)
    }.bind(this));
  }
}

var Answer = mongoose.model("answer", answerSchema, "Answer");

module.exports = Answer;