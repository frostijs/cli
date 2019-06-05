const replace = require("replace");

module.exports = config => {
  return new Promise((resolve, reject) => {
    let dir = config.default.id;
    let files = [
      `${dir}/package.json`,
      `${dir}/config/app.js`,
      `${dir}/run.sh`
    ];

    // DESCRIPTION
    replace({
      regex: config.replace.description,
      replacement: config.default.description,
      paths: files,
      recursive: true,
      silent: true
    });

    // AUTHOR
    replace({
      regex: config.replace.author,
      replacement: config.default.author,
      paths: files,
      recursive: true,
      silent: true
    });

    // ID
    replace({
      regex: config.replace.id,
      replacement: config.default.id,
      paths: files,
      recursive: true,
      silent: true
    });

    // NAME
    replace({
      regex: config.replace.name,
      replacement: config.default.name,
      paths: files,
      recursive: true,
      silent: true
    });

    // SHORT NAME
    replace({
      regex: config.replace.shortName,
      replacement: config.shortName,
      paths: files,
      recursive: true,
      silent: true
    });

    // DOMAIN
    replace({
      regex: config.replace.domain,
      replacement: config.default.domain,
      paths: files,
      recursive: true,
      silent: true
    });

    // GITHUB REPO
    replace({
      regex: `github.com/frostijs/react`,
      replacement: `github.com/${config.default.github}/${config.default.id}`,
      paths: [`${dir}/package.json`],
      recursive: false,
      silent: true
    });

    // STRIP "/starter"
    replace({
      regex: `"${config.default.id}/starter"`,
      replacement: `"${config.default.id}"`,
      paths: [`${dir}/package.json`],
      recursive: false,
      silent: true
    });

    // SETUP PACKAGE MANAGER
    replace({
      regex: `"${config.replace.package}"`,
      replacement: `"${config.package}"`,
      paths: [`${dir}/package.json`],
      recursive: false,
      silent: true
    });

    // SETUP PACKAGE MANAGER
    replace({
      regex: `"${config.replace.deploy}"`,
      replacement: `"run-p copy deploy:${config.hosting}"`,
      paths: [`${dir}/package.json`],
      recursive: false,
      silent: true
    });

    // CSS
    let cssExtension = "css";
    if (config.css === "sass") cssExtension = "scss";
    if (config.css === "stylus") cssExtension = "styl";

    replace({
      regex: "app.scss",
      replacement: `app.${cssExtension}`,
      paths: [`${dir}/src/Client.jsx`],
      recursive: false,
      silent: true
    });

    replace({
      regex: "app.scss",
      replacement: `app.${cssExtension}`,
      paths: [`${dir}/src/Client.jsx`],
      recursive: false,
      silent: true
    });

    replace({
      regex: "Error.scss",
      replacement: `Error.${cssExtension}`,
      paths: [`${dir}/src/containers/Error/Error.jsx`],
      recursive: false,
      silent: true
    });

    replace({
      regex: "Menu.scss",
      replacement: `Menu.${cssExtension}`,
      paths: [`${dir}/src/components/Menu/Menu.jsx`],
      recursive: false,
      silent: true
    });

    resolve();
  });
};
