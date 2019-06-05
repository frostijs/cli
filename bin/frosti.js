#! /usr/bin/env node

// IMPORTS
const argv = require("minimist")(process.argv.slice(2));
const { exec, spawn } = require("child_process");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "../");
const CURRENT_DIR = process.cwd();

const pkg = require(`${ROOT_DIR}/package.json`);
const start = require(`${ROOT_DIR}/src/start.js`);

const startNpm = () => {
  let script = false;

  const clientPKG = require(`${CURRENT_DIR}/package.json`);

  if (clientPKG.scripts.dev) script = clientPKG.scripts.dev;
  else if (clientPKG.scripts.start) script = clientPKG.scripts.start;

  if (script) {
    exec(script, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stderr) console.log(stderr);
      if (stdout) console.log(stdout);
    });
  }
};

// OUTPUT VERSION
if (argv.v || argv.V || argv.version) {
  console.log(pkg.version);

  // BUILD APP
} else {
  const opts = argv._[0];
  let library = null;
  let serve = false;

  if (opts === "serve") serve = true;
  if (opts === "angular") library = "angular";
  if (opts === "preact") library = "preact";
  if (opts === "react") library = "react";
  if (opts === "vanilla") library = "vanilla";
  if (opts === "vue") library = "vue";

  if (serve) startNpm();
  else start(library);
}
