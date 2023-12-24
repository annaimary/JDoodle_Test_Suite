Feature: JDoodle DashBoard Page Tests

  Background:
    Given User navigates to the application 
    Then User loggedin to the application

  @test
  Scenario: Verify Display of DashBoard Menu Items
    And User click on Dashboard button
    Then User verify display of all DashBoard menu items
