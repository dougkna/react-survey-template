/*For survey migration to the existing User schema,
  UserSurvey model referencing user id will be needed.
  For simplicity, this step will be skipped and we will use
  User schema with survey_status
*/


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var userSurveySchema = new Schema({
//   user_id: {
//     type: Schema.Types.ObjectId,
//     ref: 'User' 
//   },
//   survey_status: String
// }, { timestamps: { createdAt: 'created_at' } });

// var UserSurvey = mongoose.model("userSurvey", userSurveySchema, "UserSurvey");

// module.exports = UserSurvey;