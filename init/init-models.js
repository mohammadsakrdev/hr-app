const glob = require('glob');
const path = require('path');

const modelsPaths = glob.sync('./modules/**/*.model.js');

modelsPaths.forEach(modelPath => require(path.resolve(modelPath)));