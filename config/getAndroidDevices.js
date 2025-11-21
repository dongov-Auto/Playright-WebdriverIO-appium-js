const { execSync } = require("child_process");

function getAndroidDevices() {
  try {
    const result = execSync("adb devices", { encoding: "utf8" });
    const lines = result.split("\n");

    const devices = lines
      .filter((line) => line.includes("\tdevice"))
      .map((line) => line.split("\t")[0]);

    return devices;
  } catch (error) {
    console.error("Failed to detect Android devices:", error);
    return [];
  }
}

module.exports = getAndroidDevices;
