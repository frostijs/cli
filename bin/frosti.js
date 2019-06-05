#! /usr/bin/env node

// IMPORTS
const argv = require("minimist")(process.argv.slice(2));
const { exec, spawn } = require("child_process");
const pkg = require("../package.json");

// LIB
const start = require("../src/start");

const startNpm = () => {
  let script = false;

  if (pkg.scripts.dev) script = pkg.scripts.dev;
  else if (pkg.scripts.start) script = pkg.scripts.start;

  if (script) {
    exec(script, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
      } else if (stderr) console.log(stderr);
      else if (stdout) console.log(stdout);
    });
  }
};

// OUTPUT VERSION
if (argv.v || argv.V || argv.version) {
  console.log(argv, pkg.version);

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
