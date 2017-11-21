const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const merge = require('merge');

const bitBuilder = new (require('./BitBuilder'))();

/** 
 * Create build folder if it doesn't exist 
 */
console.info('Building your bit! Please wait...');
let buildDir = path.join(appRoot.path, 'build');
if (!fs.existsSync(buildDir))
  fs.mkdirSync(buildDir);

/*
 * Copy configuration files from ./config to ./build/config
 */
// Create a runtime configuration directory if it doesn't exist
let runtimeConfigDir = path.join(buildDir, 'configuration');
if (!fs.existsSync(runtimeConfigDir))
  fs.mkdirSync(runtimeConfigDir);

// Get all configuration files (.json files in /configuration)
let configDir = path.join(appRoot.path, 'configuration');
let configFiles = bitBuilder.findFiles(configDir, ['json']);

// Read each configuration file and merge all configuration content to one file
let json = configFiles.map((fpath) => {
  return JSON.parse(fs.readFileSync(fpath, "utf8"));
}).reduce((a, i) => merge(a, i), configFiles[0]);

// Create the runtime configuration file in the build folder
let runtimeConfigFile = path.join(runtimeConfigDir, 'default.json')
fs.writeFileSync(runtimeConfigFile, JSON.stringify(json, null, 2));

console.info('Build Completed!');
