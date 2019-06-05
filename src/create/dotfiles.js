const { exec } = require("child_process");
const fs = require("fs-extra");
const replace = require("replace");

const emoji = require("../emoji");

module.exports = config => {
  return new Promise((resolve, reject) => {
    try {
      const id = config.default.id;
      const licenseFile = [`${id}/LICENSE`];
      let licenseDomain = "";
      let licenseHolder = "";

      console.log(`${emoji.construction_worker}  Copying dotfiles`);

      exec(`git clone ${config.repos.dotfiles} ${id}/dotfiles`, err => {
        fs.copy(`${id}/dotfiles/dotfiles`, `${id}/`);
        fs.copy(`${id}/dotfiles/configs`, `${id}/`);

        // REMOVE DEFAULT LICENSE
        fs.remove(`${id}/LICENSE`, () => {
          // SET LICENSE
          if (config.license === "apache")
            fs.copyFile(`${id}/dotfiles/licenses/Apache.md`, `${id}/LICENSE`);
          if (config.license === "bsd")
            fs.copyFile(`${id}/dotfiles/licenses/BSD.md`, `${id}/LICENSE`);
          if (config.license === "gnu")
            fs.copyFile(`${id}/dotfiles/licenses/GNU.md`, `${id}/LICENSE`);
          if (config.license === "mit")
            fs.copyFile(`${id}/dotfiles/licenses/MIT.md`, `${id}/LICENSE`);

          replace({
            regex: `${config.replace.license.year}`,
            replacement: new Date().getFullYear(),
            paths: licenseFile,
            recursive: true,
            silent: true
          });

          // LICENSE
          replace({
            regex: `${config.replace.license.holder}`,
            replacement: config.copyright,
            paths: licenseFile,
            recursive: true,
            silent: true
          });

          if (config.domain !== "my-app.com") licenseDomain = config.domain;
          if (config.copyright !== "ACME") licenseHolder = config.copyright;

          replace({
            regex: `${config.replace.license.website}`,
            replacement: config.domain,
            paths: licenseFile,
            recursive: true,
            silent: true
          });

          replace({
            regex: `${config.replace.license.year}`,
            replacement: new Date().getFullYear(),
            paths: licenseFile,
            recursive: true,
            silent: true
          });

          fs.remove(`${id}/dotfiles`);

          resolve();
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};
