# React + MongoDB Survey App

### DESCRIPTION

When users sign up for our site we want them to be presented with a questionnaire that allows them to
define their preference for certain types of products. We want to create a web based experience that makes it
easy for them to enter in data in a survey format, and store that data in a database for reference when they
view our catalog. Users should be able to pick up where they left off if they close the browser and come back
later. The app would be able to keep state across devices.


### GOAL

Create a survey that :
1) provides user experience to four types of users (new, revisiting, complete, retired) 
2) reflects scalability and flexibility in database design, while minimizing inefficiency


### ASSUMPTIONS

- Not to overwhelm customers, each survey will contain reasonably small set of questions (1-50 questions). Pagination may be needed.
- Survey will minimize uses of free response types of questions.
- Database design will need to reflect possible changes or versioning from the admin, i.e. admin may update, alter, or delete survey questions and answers.


### COVERAGE

![Home View](https://user-images.githubusercontent.com/22410733/27802990-0f211db0-5fdc-11e7-87ec-da2da8bca788.png)


### DATABASE DESIGN

- User (_id, name, email, password, survey_status)
- Survey (_id, version, name)
- Question (_id, survey_name, number, type, text, (optional: version))
- Answer (_id, question_id, value)
- UserAnswer (_id, question_id, answer_id, user_id)


### PROCESS

- There are four types of users with a survey: new, revisiting, complete, or retired user.
- Each user has survey status of 'new', 'pending', 'complete', or 'retired'.
- Upon signup, user is assigned survey status 'new'.
- Upon signup or login, retrieve one most recent published survey.
- If user is a revisiting user ('pending'), retrieve user's saved answers.
- Survey component will save two states, 'survey questions' and user's 'picked answers' (if user is new or has no saved answers, this is blank).
- As user fills questions with answers, Question component will update 'picked answers'.
- User may save and exit, or choose to decline ('retire') to participate.
- If user saves his answers, UserAnswer will update.
- When all questions are filled with answers, user may save as complete, and his survey status will become 'complete'. Complete users will not be shown the survey upon login.


### ADVANTAGES

- By separating Question and Answer models (vs. having answer choices array in each Question) allows flexibility to alter answers, swap answer orders etc.
- By allowing UserAnswer model to reference answer_id (vs. storing value '0' for the first choice) this also allows any updates to questions and answers without having to update user's answers


### VIEW

https://z-survey-app.herokuapp.com/


