(function() {
  module.exports = function() {
    var helper = this;

    //TODO xpath

    this.Given(/^I'm on the submit question page$/, function(next) {
      var world = helper.world;
      world.browser.
        url(world.cucumber.mirror.rootUrl+"/questionSubmit").
        call(next);
    });

    this.Given(/^the title is written$/, function(next) {
      var world = helper.world;

      world.browser.
        waitForVisible('[name="title"]').
        call(next);
    });

    this.Given(/^there is a body$/, function(next) {
      var world = helper.world;

      world.browser.
        waitForVisible('[name="title"]').
        call(next);
    });

    this.When(/^When i click on "([^"]*)"$/, function(buttonValue, next) {
      var world = helper.world;
      world.browser.
        waitForVisible("input[value='"+buttonValue+"']").
        click("input[value='"+buttonValue+"']")
        call(next);
    });
  };
})();