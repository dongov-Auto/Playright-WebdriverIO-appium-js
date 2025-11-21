const BasePage = require("../../core/common/BasePage");
const selector = {
  register: require("../registrationHome/RegisterScreenLocator"),
};

class RegisterScreenActions extends BasePage {
  async clickToToiDongYCacDieuKhoan() {
    const isShown = await $(
      selector.register.rdToiDongYDieuKienVaDieuKhoan
    ).catch(() => false);

    if (isShown) {
      await this.click(selector.register.rdToiDongYDieuKienVaDieuKhoan);
    }
  }

  async clickToTiepTuc() {
    const isShown = await $(selector.register.btnTiepTuc).catch(() => false);

    if (isShown) {
      await this.click(selector.register.btnTiepTuc);
    }
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
