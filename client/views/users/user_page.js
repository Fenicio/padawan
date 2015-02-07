Template.user.helpers({
  fiveQuestions: function() {
    console.log(this);
    return Questions.find({ author: this.username});
  }
});