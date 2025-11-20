const BasePage = require("../../core/common/BasePage");
const selector = {
  login: require("../loginHome/LoginScreenLocator"),
};

class LoginPage extends BasePage {
  async ignoreUpdatedPopup() {
    await this.click(selector.login.btnBoQua);
  }

  async clickToDangKyButton() {
    await this.click(selector.login.btnDangKy);
  }

  async enterEmail(email) {
    await this.setValue(selector.login.inputEmail, email);
  }

  async enterPassword(password) {
    await this.setValue(selector.login.inputPassword, password);
  }
}

module.exports = new LoginPage();
