// LIB
const inquirer = require("inquirer");
const { includes } = require("lodash");

module.exports = config => {
  const prompt = inquirer.createPromptModule();

  return new Promise((resolve, reject) => {
    prompt([
      require("./flows/library")(config),
      require("./flows/css")(config),
      require("./flows/name")(config)
    ]).then(() => {
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
