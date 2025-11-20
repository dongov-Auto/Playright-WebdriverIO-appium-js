const BasePage = require("../../core/common/BasePage");
const selector = {
  base: require("./BaseLocator"),
};
class BaseActions extends BasePage {
  async verifyTextDynamicVisible(text) {
    const element = await selector.base.getLocatorWithTextDynamic(text);
    await this.expectDisplayed(element);
  }

  async clickToElementWithTextDynamic(text) {
    const element = await selector.base.getLocatorWithTextDynamic(text);
    await this.click(element);
  }

  async clickToElementWithButtonDynamic(text) {
    const element = await selector.base.getLocatorWithButtonDynamic(text);
    await this.click(element);
  }
}
module.exports = new BaseActions();
