import AppScreen from "./AppScreen.js";

const SELECTORS = {
  SCREEN: "~Login-screen",
};

class LoginScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }

  get screen() {
    return $(SELECTORS.SCREEN);
  }
  get loginContainerButton() {
    return $("~button-login-container");
  }
  get signUpContainerButton() {
    return $("~button-sign-up-container");
  }
  get loginButton() {
    return $("~button-LOGIN");
  }
  get signUpButton() {
    return $("~button-SIGN UP");
  }
  get email() {
    return $("~input-email");
  }
  get password() {
    return $("~input-password");
  }
  get repeatPassword() {
    return $("~input-repeat-password");
  }
  get biometricButton() {
    return $("~button-biometric");
  }

  async isBiometricButtonDisplayed() {
    return this.biometricButton.isDisplayed();
  }

  async tapOnLoginContainerButton() {
    await this.loginContainerButton.click();
  }

  async tapOnSignUpContainerButton() {
    await this.signUpContainerButton.click();
  }

  async tapOnBiometricButton() {
    await this.biometricButton.click();
  }

  async submitLoginForm({ username, password }) {
    console.log(`input email`);
    await this.email.setValue(username);
    console.log(`click password`);
    await this.password.click();
    console.log(`input password`);
    await this.password.setValue(password);

    if (await driver.isKeyboardShown()) {
      await $("~Login-screen").click();
    }

    await this.loginButton.scrollIntoView({
      scrollableElement: await this.screen,
    });

    await this.loginButton.click();
  }

  async submitSignUpForm({ username, password }) {
    await this.email.setValue(username);
    await this.password.setValue(password);
    await this.repeatPassword.setValue(password);

    if (await driver.isKeyboardShown()) {
      await $("~Login-screen").click();
    }

    await this.signUpButton.scrollIntoView({
      scrollableElement: await this.screen,
    });

    await this.signUpButton.click();
  }
}

export default new LoginScreen();
