const { join } = require("node:path");
exports.config = {
  runner: "local",
  port: 4723,

  specs: ["./src/tests/features/**/*.feature"],

  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      // "wdio:maxInstances": 1,
      "appium:deviceName": "emulator-5554",
      "appium:platformVersion": "16.0",
      "appium:orientation": "PORTRAIT",
      "appium:automationName": "UiAutomator2",

      "appium:app": join(process.cwd(), "app", "Myf88_sit_581_051125.apk"),
      "appium:newCommandTimeout": 240,
      "appium:autoGrantPermissions": true,
      "appium:autoDismissAlerts": false,
    },
  ],

  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 10,

  services: [
    "appium",
    "visual",
    "reportportal",
    "cucumber-viewport-logger",
    "rerun",
  ],

  framework: "cucumber",

  reporters: ["spec"],

  cucumberOpts: {
    require: ["./src/main/steps/**/*.js"],
    timeout: 60000,
  },
};
