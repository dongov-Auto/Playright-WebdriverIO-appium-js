class BaseLocator {
  getLocatorWithTextDynamic(text) {
    const xpath = `//*[contains(@text,'${text}')] | //*[contains(@content-desc,'${text}')]`;
    return $(xpath);
  }

  getLocatorWithButtonDynamic(text) {
    const xpath = `//android.widget.Button[@content-desc='${text}']`;
    return $(xpath);
  }
}

module.exports = new BaseLocator();
