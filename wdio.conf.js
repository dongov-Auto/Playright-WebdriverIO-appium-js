const deviceCaps = require("./deviceCapabilities.json");
const {
  startAppiumForDevices,
  stopAllAppiumServers,
} = require("./config/checkAppiumServer");
exports.config = {
  runner: "local",
  specs: [],

  runner: "local",

  maxInstances: deviceCaps.length,

  hostname: "localhost",
  path: "/",

  capabilities: deviceCaps,

  services: [],

  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 5,

  framework: "cucumber",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "./results/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  cucumberOpts: {
    require: ["./src/main/steps/**/*.js"],
    timeout: 60000,
  },
  onPrepare: function (config, capabilities) {
    console.log("🛑 Tests finished, stopping any remaining Appium servers...");
    startAppiumForDevices();
  },
  beforeScenario: async function () {
    const caps = browser.capabilities;

    const appPath = caps.app || caps["appium:app"];
    const appPackage = caps.appPackage || caps["appium:appPackage"];

    if (!appPath || !appPackage) {
      console.warn("Không tìm thấy app hoặc appPackage trong capabilities!");
      return;
    }

    try {
      await browser.activateApp(appPackage);
      console.log("✓ App started fresh!");
    } catch (err) {
      console.warn("Lỗi khi reset và reinstall app:", err.message);
    }
  },

  afterScenario: async function (result) {
    if (!result.passed) {
      await browser.takeScreenshot();
    }

    const caps = browser.capabilities;
    const appPackage = caps.appPackage || caps["appium:appPackage"];
    console.log(">>> AFTER SCENARIO: đóng app");

    if (!appPackage) {
      console.warn("Không tìm thấy appPackage trong capabilities!");
      return;
    }

    try {
      await browser.terminateApp(appPackage);
    } catch (err) {
      console.warn("Không thể terminate app:", err.message);
    }
  },
  // Optional: stop remaining Appium servers khi test kết thúc
  onComplete: function () {
    console.log("🛑 Tests finished, stopping any remaining Appium servers...");
    stopAllAppiumServers();
  },
};
