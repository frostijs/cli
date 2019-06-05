module.exports = config => {
  return {
    name: "library",
    type: "list",
    default: "React",
    message: "Which library would you like to use?",
    choices: [
      {
        value: "React",
        checked: true
      },
      {
        value: "Vanilla JS",
        checked: false
      }
    ],
    filter: value => {
      config.library = value.toLowerCase();

      return new Promise((resolve, reject) => {
        resolve(value.toLowerCase());
      });
    }
  };
};
