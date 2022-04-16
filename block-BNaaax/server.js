var path = require('path');

var relativePath = './index.js';

var absolutePath = __dirname;

var indexPath = path.join(__dirname, 'server.js');

console.log(relativePath, absolutePath, indexPath);