import page from "../common/BaseActions";
const BasePage = require("../../core/common/BasePage");
const selector = {
  register: require("../registrationHome/RegisterScreenLocator"),
};

class RegisterScreenActions extends BasePage {
  async clickToToiDongYCacDieuKhoan() {
    await this.click(selector.register.rdToiDongYDieuKienVaDieuKhoan);
  }

  async clickToTiepTuc() {
    await this.click(selector.register.btnTiepTuc);
  }

  async clickToEnterButton() {
    await this.click(selector.register.btnEnter);
  }

  async verifyTexDisplayInErrorPopup(expected) {
    const actual = await this.getAttribute(selector.register.msgThongBaoLoi);
    await this.expectEqual(actual, expected);
  }
}
module.exports = new RegisterScreenActions();
