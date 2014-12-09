Template.user.rendered=function() {
  console.log("user_page rendered", this);
};

Template.user.helpers({
  fiveQuestions: function() {
    console.log("fiveQuestions params: ",Session.get("userPageId"));
    return Questions.find({ userId: Session.get("userPageId")});
  },
  upvotedQuestions: function() {
    return Questions.find({ upvoters: {$in: [Session.get("userPageId")]} });
  },
  watchingQuestions: function() {
    return Questions.find({ watchers: { $in: [Session.get("userPageId")]}});
  }
});