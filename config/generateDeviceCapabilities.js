const fs = require("fs");
const getAndroidDevices = require("./getAndroidDevices");
const { join } = require("node:path");

function generateCaps() {
  const baseSystemPort = 8200;
  const basePort = 4725;

  const devices = getAndroidDevices();
  const split = JSON.parse(fs.readFileSync("./featureSplit.json"));

  const caps = devices.map((udid, index) => ({
    platformName: "Android",
    "appium:deviceName": udid,
    "appium:udid": udid,
    "appium:systemPort": baseSystemPort + index,
    "appium:automationName": "UiAutomator2",
    "appium:app": join(process.cwd(), "app", "Myf88_sit_581_051125.apk"),
    "appium:autoGrantPermissions": true,
    "appium:autoDismissAlerts": false,

    // feature cho đúng device
    specs: split[index] || [],

    port: basePort + index,
  }));

  fs.writeFileSync("./deviceCapabilities.json", JSON.stringify(caps, null, 2));
  console.log("✅ deviceCapabilities.json generated!");
}

if (require.main === module) {
  generateCaps();
}

module.exports = generateCaps;
