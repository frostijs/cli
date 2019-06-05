// LIB
require("colors");
const inquirer = require("inquirer");
const { includes } = require("lodash");

module.exports = config => {
  const prompt = inquirer.createPromptModule();

  const initial = [
    require("./flows/css")(config),
    require("./flows/name")(config)
  ];

  // ONLY PROMPT FOR LIBRARY IF IT ISN'T ALREADY SET
  if (!config.library) {
    initial.unshift(require("./flows/library")(config));
  } else {
    const library =
      config.library.charAt(0).toUpperCase() + config.library.slice(1);
    console.log(`Seting up a new ${library.blue} project...\n`);
  }

  return new Promise((resolve, reject) => {
    prompt(initial).then(() => {
      prompt([
        require("./flows/short-name")(config),
        require("./flows/description")(config),
        require("./flows/domain")(config),
        require("./flows/github")(config),
        require("./flows/author")(config),
        require("./flows/copyright")(config),
        require("./flows/license")(config),
        require("./flows/hosting")(config),
        require("./flows/pkg")(config),
        require("./flows/install")(config)
      ]).then(() => {
        resolve(config);
      });
    });
  });
};
