const colors = require("colors");
const figlet = require("figlet");

const create = require("./create");
const prompt = require("./prompt");
const config = require("./_config.json");

// const fontTest = () => {
//   const fonts = [
//     "ANSI Shadow",
//     "DOS Rebel",
//     "Broadway",
//     "Georgia11",
//     "Basic",
//     "Roman",
//     "Poison",
//     "Modular",
//     "Jacky",
//     "Star Wars",
//     "Soft"
//   ];
//
//   fonts.map(font => {
//     console.log(font);
//     console.log(
//       figlet.textSync(`${config.setup.name}`, {
//         font
//       }).blue
//     );
//     console.log("\n");
//   });
// };

module.exports = library => {
  return new Promise((resolve, reject) => {
    console.log("\n");
    console.log("\n");

    console.log(
      figlet.textSync(`${config.setup.name}`, {
        horizontalLayout: "full",
        font: "DOS Rebel"
      }).white
    );

    console.log("\n");

    if (library) config.library = library;

    prompt(config).then(conf => {
      create(conf);
    });
  });
};
