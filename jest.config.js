const path = require('path');
const fs = require('fs');
const packages = require('./package.json');

function getJestConfig() {
  const jestConfigFiles = [];
  packages.workspaces.forEach(function (workspace) {
    const pathSuffix = `${workspace}/jest.config.js`;
    const filePath = path.join(__dirname, pathSuffix);
    // if jest config exist in pacakges push it
    if (fs.existsSync(filePath)) {
      jestConfigFiles.push(`<rootDir>/${pathSuffix}`);
    }
  });
  return jestConfigFiles;
}

module.exports = {
  projects: getJestConfig(),
};
