const path = require('path');
const chalk = require("chalk");
const fs = require('fs');

const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

function environmentPath() {
  let filePath = './src/environments/environment' + (env === 'prod' ? '.prod' : '') + '.ts';
  console.log("File path is: " + filePath);
  
  if (!fs.existsSync(filePath)) {
    console.error(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};


module.exports = function () {
  useDefaultConfig[env].resolve.alias = {
    "@env": path.resolve(environmentPath()),
    "@pages": path.resolve('./src/pages/'),
    "@services": path.resolve('./src/services/'),
  };
  return useDefaultConfig;
};


