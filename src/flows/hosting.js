module.exports = config => {
  return {
    name: "hosting",
    type: "checkbox",
    message: "Do you wanna setup deployment for any of these?",
    choices: [
      {
        value: "firebase",
        checked: false
      },
      {
        value: "heroku",
        checked: false
      }
    ],
    filter: value => {
      config.hosting = value;

      return new Promise((resolve, reject) => {
        resolve(value);
      });
    }
  };
};
