const fs = require("fs");
const path = require("path");
require("dotenv").config();

function loadTargetCompany() {
  const configPath = path.resolve(__dirname, "..", "config.json");
  const raw = fs.readFileSync(configPath);
  const json = JSON.parse(raw);

  const companyName = process.env.TARGET_COMPANY;

  const target = json.targets.find(
    (t) => t.name.toLowerCase() === companyName.toLowerCase()
  );

  if (!target) {
    throw new Error(`Company "${companyName}" not found in config.json`);
  }

  return {
    name: target.name,
    url: target.url,
    user: process.env[target.user_env],
    pass: process.env[target.password_env],
  };
}

module.exports = {
  loadTargetCompany,
};
