Feature: I can buy some item

  Scenario Outline: Nhập thông tin số điện thoại không đúng định dạng
    When I ignore the updated popup
    When I click on element with text "Đăng ký"
    And I tick the terms and conditions checkbox
    When I click on element with text "Tiếp tục"
    Then I verify "Nhập số điện thoại đăng ký" is displayed
    When I enter "0123456789"
    And I click on enter button
    Then I verify "Nhập số CCCD/CMND" is displayed
    When I enter "032090034900"
    And I click on enter button
    Then I verify text in popup is "<message>"

    Examples:
      | message                             |
      | Số điện thoại chưa đúng định dạng ! |
