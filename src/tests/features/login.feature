Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area
    Given I am on the login page
    When I enter valid login with "<username>" and "<password>"

    Examples:
      | username          | password | message                |
      | test@webdriver.io | Test1234 | You logged into  area! |
