const { spawn, execSync } = require("child_process");
const fs = require("fs");
const { join } = require("path");
const getAndroidDevices = require("./getAndroidDevices");

const BASE_PORT = 4725;
const BASE_SYSTEM_PORT = 8200;
const LOG_DIR = join(process.cwd(), "appium-logs");

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

let appiumProcesses = []; // [{ udid, port, systemPort, process, logFile }]

// Start Appium server cho tất cả devices
function startAppiumForDevices() {
  const devices = getAndroidDevices();
  if (!devices || devices.length === 0) {
    console.log("❌ No Android devices detected!");
    return [];
  }

  devices.forEach((udid, i) => {
    const port = BASE_PORT + i;
    const systemPort = BASE_SYSTEM_PORT + i;

    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\..+/, "");
    const logFile = join(LOG_DIR, `appium_${udid}_${port}_${timestamp}.log`);
    const out = fs.openSync(logFile, "a");
    const err = fs.openSync(logFile, "a");

    console.log(`🚀 Starting Appium for ${udid} on port ${port}`);
    console.log(`📄 Log file: ${logFile}`);

    const process = spawn("npx", ["appium", "-p", port, "--session-override"], {
      stdio: ["ignore", out, err],
      shell: true,
    });

    appiumProcesses.push({ udid, port, systemPort, process, logFile });

    process.on("close", (code) => {
      console.log(
        `Appium server for ${udid} on port ${port} exited with code ${code}`
      );
    });
  });

  return appiumProcesses;
}

// Stop Appium server theo device
function stopAppiumByDevice(udid) {
  const index = appiumProcesses.findIndex((p) => p.udid === udid);
  if (index === -1) {
    console.warn(`⚠️ No Appium server found for device ${udid}`);
    return;
  }

  const { process, port } = appiumProcesses[index];
  if (!process.killed) {
    process.kill("SIGINT");
    console.log(`🛑 Appium server for device ${udid} on port ${port} stopped`);
  }

  appiumProcesses.splice(index, 1);
}

// Kill Appium server cũ trên Windows
function stopAllAppiumServers(basePort = BASE_PORT, maxPort = 4800) {
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

module.exports = {
  startAppiumForDevices,
  stopAppiumByDevice,
  stopAllAppiumServers,
};
