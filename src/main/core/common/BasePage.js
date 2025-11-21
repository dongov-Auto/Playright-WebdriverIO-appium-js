// base/BasePage.js
const { expect } = require("@wdio/globals");
const selector = {
  base: require("./BaseLocator"),
};
class BasePage {
  /**
   * Chờ element hiển thị
   * @param {WebdriverIO.Element} element
   * @param {number} timeout
   */
  async waitForElement(element, timeout = 5000) {
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Click vào element
   * @param {WebdriverIO.Element} element
   */
  async click(element) {
    await this.waitForElement(element);
    await expect(element).toBeDisplayed(); // thêm assert cho chắc
    await element.click();
  }

  /**
   * Nhập text vào element
   * @param {WebdriverIO.Element} element
   * @param {string} text
   */
  async setValue(element, text) {
    await this.waitForElement(element);
    await element.setValue(text);
  }

  /**
   * Lấy text từ element
   * @param {WebdriverIO.Element} element
   * @returns {Promise<string>}
   */
  async getText(element) {
    await this.waitForElement(element);
    return await element.getText();
  }

  /**
   * Lấy content Description từ element
   * @param {WebdriverIO.Element} element
   * @returns {Promise<string>}
   */
  async getAttribute(element) {
    await this.waitForElement(element);
    return await element.getAttribute("contentDescription");
  }

  /**
   * Kiểm tra element có hiển thị
   * @param {WebdriverIO.Element} element
   */
  async expectDisplayed(element) {
    await expect(element).toBeDisplayed();
  }

  /**
   * So sánh giá trị actual với expected
   * @param {string} actual
   * @param {string} expected
   */
  async expectEqual(actual, expected) {
    await expect(actual.trim()).toBe(expected.trim());
  }

  async clickToElementWithButtonDynamic(text) {
    const element = await selector.base.getLocatorWithButtonDynamic(text);
    await this.click(element);
  }

  async clickToElementWithTextDynamic(text) {
    const element = await selector.base.getLocatorWithTextDynamic(text);
    await this.click(element);
  }

  async verifyTextDynamicVisible(text) {
    const element = await selector.base.getLocatorWithTextDynamic(text);
    await this.expectDisplayed(element);
  }
}

module.exports = BasePage;
