var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  first_name: { type: String, required: true },
  email: String,
  password: String,
  survey_status: String
}, { timestamps: { createdAt: 'created_at' } });

var User = mongoose.model("user", userSchema, "User");

module.exports = User;