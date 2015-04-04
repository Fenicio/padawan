Feature: Registered user can input a question

  As an user
  I want to insert questions that remain visible
  So other users can answer them

  Scenario: Insert Question
  Given I'm on the submit question page
  And the title is written
  And there is a body
  When i click on "Insertar"
  Then the Question will be inserted