// startAppiumServers.js
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const { join } = require("path");
const getAndroidDevices = require("./getAndroidDevices");

// Cấu hình port
const BASE_PORT = 4725;
const BASE_SYSTEM_PORT = 8200;
const LOG_DIR = join(process.cwd(), "appium-logs");

// Kill Appium server cũ trên Windows
function killAppiumServers(basePort = BASE_PORT, maxPort = 4800) {
  try {
    console.log("🛑 Killing existing Appium servers...");

    // Lấy tất cả PID đang listen
    const result = execSync(`netstat -ano`, { encoding: "utf8" });
    const lines = result.split("\n");

    const pidsToKill = new Set();
    lines.forEach((line) => {
      const parts = line.trim().split(/\s+/);
      if (!parts[1] || !parts[4]) return;

      // Lấy port từ Local Address
      const localPort = parseInt(parts[1].split(":").pop(), 10);
      if (localPort >= basePort && localPort <= maxPort) {
        pidsToKill.add(parts[4]);
      }
    });

    if (pidsToKill.size === 0) {
      console.log("🟢 No Appium servers running.");
      return;
    }

    // Kill PID
    pidsToKill.forEach((pid) => {
      try {
        execSync(`taskkill /F /PID ${pid}`);
        console.log(`❌ Killed PID ${pid}`);
      } catch (err) {
        console.warn(`⚠️ Failed to kill PID ${pid}: ${err.message}`);
      }
    });

    // Chờ 2s để port giải phóng
    console.log("⏱ Waiting 2s for ports to be free...");
    execSync("timeout /t 2 >nul");
  } catch (err) {
    console.warn("⚠️ Error killing Appium servers:", err.message);
  }
}

// Start Appium cho tất cả devices
function startAppiumForDevices() {
  const devices = getAndroidDevices();
  if (!devices || devices.length === 0) {
    console.log("❌ No Android devices detected!");
    return;
  }

  console.log(`📱 Detected devices: ${devices.join(", ")}`);

  // Kill server cũ
  killAppiumServers();

  // Tạo folder log nếu chưa có
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

  const deviceConfigs = [];

  devices.forEach((udid, index) => {
    const port = BASE_PORT + index;
    const systemPort = BASE_SYSTEM_PORT + index;

    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\..+/, "");
    const logFile = join(LOG_DIR, `appium_${udid}_${port}_${timestamp}.log`);
    const out = fs.openSync(logFile, "a");
    const err = fs.openSync(logFile, "a");

    console.log(`🚀 Starting Appium for ${udid} on port ${port}`);
    console.log(`📄 Log: ${logFile}`);

    const appiumProcess = spawn(
      "npx",
      ["appium", "-p", port, "--session-override"],
      {
        stdio: ["ignore", out, err],
        shell: true,
      }
    );

    deviceConfigs.push({ udid, port, systemPort, logFile });

    appiumProcess.on("close", (code) => {
      console.log(`Appium server on port ${port} exited with code ${code}`);
    });
  });

  return deviceConfigs;
}

// Nếu chạy trực tiếp
if (require.main === module) {
  startAppiumForDevices();
}

module.exports = startAppiumForDevices;
