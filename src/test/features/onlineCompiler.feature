Feature: JDoodle Online Java Compiler Page Tests

  Background:
    Given User navigates to the application 
    Then User loggedin to the application

  @test
  Scenario: Verify Online Java Compiler by running existing sample code
    And User click on Dashboard button
    And User click on Start Coding button
    And User Verify display of code editor
    And User get the existing code in editor
    And User click on Execute button
    And User verify the output displayed as "Sum of x+y = 35"

  @test
  Scenario: Verify Online Java Compiler by editing code in the editor
    And User click on Dashboard button
    And User click on Start Coding button
    And User Verify display of code editor
    And User enter the code in code container as "sampleCode.txt"
    And User click on Execute button
    And User verify the output displayed as "Difference of x-y = 15"

  @test
  Scenario: Verify Online Java Compiler by creating new project
    And User click on Dashboard button
    And User click on Start Coding button
    And User Verify display of code editor
    And User verify the editor has some code
    And User click on New Project
    And User verify the display of popup with heading as "New Project"
    And User verify display of text as "Do you want to clear current project?"
    And User click on Yes button
    And User verify editor is cleared out