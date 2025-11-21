const glob = require("glob");
const fs = require("fs");
const getAndroidDevices = require("./getAndroidDevices");

// 🔥 Lấy số lượng thiết bị thực từ ADB
function getDeviceCount() {
  const devices = getAndroidDevices();
  return devices.length || 1; // fallback nếu không detect được
}

function splitFeatures(devicesCount) {
  const features = glob.sync("./src/tests/features/**/*.feature");

  const result = {};
  for (let i = 0; i < devicesCount; i++) {
    result[i] = [];
  }

  features.forEach((feature, index) => {
    const deviceIndex = index % devicesCount;
    result[deviceIndex].push(feature);
  });

  fs.writeFileSync("./featureSplit.json", JSON.stringify(result, null, 2));
  console.log("✅ featureSplit.json generated!");
}

module.exports = splitFeatures;

if (require.main === module) {
  const count = getDeviceCount();
  console.log(`📌 Number of connected devices: ${count}`);
  splitFeatures(count);
}
