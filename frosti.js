#! /usr/bin/env node

// IMPORTS
const argv     = require('minimist')(process.argv.slice(2))
const pkg      = require('./package.json')

// LIB
const start    = require('./lib/start')

// OUTPUT VERSION
if (argv.v || argv.V || argv.version) {
  console.log(pkg.version)

// BUILD APP
} else {
  // console.log(process.argv[2]);
  start()
}
