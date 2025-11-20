import { Given, When, Then } from "@wdio/cucumber-framework";
import TabBar from "../pageobjects/TabBar.js";
import LoginScreen from "../pageobjects/LoginScreen.js";

Given("I am on the login page", async () => {
  await TabBar.waitForTabBarShown();
  await TabBar.openLogin();
  await LoginScreen.waitForIsShown(true);
});

When(
  "I enter valid login with {string} and {string}",
  async (username, password) => {
    await LoginScreen.tapOnLoginContainerButton();
    await LoginScreen.submitLoginForm({
      username: username,
      password: password,
    });
  }
);
