Template.user.helpers({
  fiveQuestions: function() {
    console.log(this);
    return Questions.find({ author: this.username});
  }, 
  formatDate: function(dte) {
    return new Date(dte).toString('dd/mm/YYYY');
  }
});