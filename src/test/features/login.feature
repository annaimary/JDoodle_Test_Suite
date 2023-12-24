Feature: JDoodle User Authentication tests

  Background:
    Given User navigates to the application
    And User click on the main login button 

  @test
  Scenario: Login should be success
    And User enter the Email Address
    And User enter the password
    When User click on the login button
    Then Login should be successful
