#!/usr/bin/env node

const appRoot = require('app-root-path');
const fs = require('fs');
const path = require('path');

let builderOverride = path.join(appRoot.path, 'bit-builder.js');
if (fs.existsSync(builderOverride)) {
  console.info('Building your bit using your custom builder! Please wait...');
  require(builderOverride);
}
else
  require('./default.js');

module.exports require('./BitBuilder')
