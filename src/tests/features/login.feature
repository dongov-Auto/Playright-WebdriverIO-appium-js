Feature: The Internet Guinea Pig Website

  Scenario Outline: Đi đến màn hình đăng ký tài khoản
    Given I ignore the updated popup
    When I click to Dang Ky button
    Then I verify "<message>" is displayed

    Examples:
      | message                        |
      | Điều kiện & điều khoản sử dụng |

  Scenario Outline: Nhập thông tin số điện thoại không đúng định dạng
    Given I ignore the updated popup
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

  Scenario Outline: Nhập thông tin Số CCCD/CMND không đúng định dạng
    Given I ignore the updated popup
    When I click on element with text "Đăng ký"
    And I tick the terms and conditions checkbox
    When I click on element with text "Tiếp tục"
    Then I verify "Nhập số điện thoại đăng ký" is displayed
    When I enter "0123456789"
    And I click on enter button
    Then I verify "Nhập số CCCD/CMND" is displayed
    When I enter "03209003490"
    And I click on enter button
    Then I verify text in popup is "<message>"

    Examples:
      | message                                  |
      | Số CCCD/CMND phải là 9 hoặc 12 ký tự số. |
