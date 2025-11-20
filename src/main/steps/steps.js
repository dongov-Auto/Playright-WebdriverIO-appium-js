import { Given, When, Then } from "@wdio/cucumber-framework";
import LoginScreen from "../pageobjects/loginHome/LoginScreenActions.js";
import RegisterScreen from "../pageobjects/registrationHome/RegisterScreenActions.js";
import page from "../pageobjects/common/BaseActions.js";

Given("I ignore the updated popup", async () => {
  await LoginScreen.ignoreUpdatedPopup();
});

When(`I click to Dang Ky button`, async () => {
  await LoginScreen.clickToDangKyButton();
});

Then(`I verify {string} is displayed`, async (message) => {
  await page.verifyTextDynamicVisible(message);
});

When(`I click on element with text {string}`, async (text) => {
  await page.clickToElementWithTextDynamic(text);
});

When(`I tick the terms and conditions checkbox`, async () => {
  await RegisterScreen.clickToToiDongYCacDieuKhoan();
});

When(`I enter {string}`, async (text) => {
  for (const digit of text) {
    await page.clickToElementWithButtonDynamic(digit);
  }
});

When(`I click on enter button`, async () => {
  await RegisterScreen.clickToEnterButton();
});

Then(`I verify text in popup is {string}`, async function (message) {
  await RegisterScreen.verifyTexDisplayInErrorPopup(message);
});
