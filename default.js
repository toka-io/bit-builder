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
let configDir = path.join(appRoot.path, 'config');
console.log(bitBuilder.findFiles(configDir, ['json']));