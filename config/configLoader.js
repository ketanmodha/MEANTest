'use strict';
// process.argv[2] second parameter for the environment this will be passed while start service
if (process.argv[2]) {
    process.env.NODE_ENV = process.argv[2];
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const env = process.env.NODE_ENV;

console.log(`Node environment: ${env}`);
console.log(`loading config.${env}.json`);

module.exports = require(`../config/config.${env}.json`);