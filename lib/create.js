// PACKAGES
const _ = require("lodash");
const clear = require("clear");
const CLI = require("clui");
const colors = require("colors");
const fs = require("fs-extra");
const { exec, spawn } = require("child_process");
const jsonfile = require("jsonfile");
const log = require("single-line-log").stdout;
const path = require("path");
const termImg = require("term-img");

// LIBS
const emoji = require("./emoji");
const end = require("./end");
const gif = require("./gif");
const setNames = require("./set-names");
const start = require("./start");
const util = require("./util");

// CREATION HELPERS
const dotfiles = require("./create/dotfiles");

const ROOT_DIR = path.resolve(__dirname, "../");

module.exports = config => {
  const dir = path.basename(process.cwd());
  const id = config.default.id;
  let hasError = false;

  const catchError = msg => {
    hasError = true;
    console.error(
      `\n${emoji.broken_heart}  Oh noes, something went wrong! ${msg}\n`.red
    );

    try {
      fs.remove(`${id}`);
    } catch (e) {}
  };

  clear();

  console.log(
    `\n${emoji.nerd}  Making sure I can write to ${"/".blue +
      "".blue +
      id.blue}\n`
  );

  // ENSURE PATH EXISTS
  fs.pathExists(id)
    .then(exists => {
      // STOP IF DIR EXISTS
      if (exists) {
        console.log(
          `${emoji.broken_heart}  Choosing not clone into existing directory.\n`
            .red
        );
        end("bad");
        return;
      }

      console.log(
        `\n${emoji.pencil}  Creating ${"/".blue +
          "".blue +
          id.blue} directory...\n`
      );

      // STOP IF DIR CANNOT BE WRITTEN TO
      util.writeable(dir, check => {
        if (check) {
          console.log(
            `${
              emoji.sad
            }  Oh noes! I don't have permission to add files to ${id}\n`.red
          );
          end("bad");
          return;
        }

        // CREATE DIR
        exec(`mkdir ${id}`, err => {
          if (err) {
            console.log(`${emoji.sad}  Error creating directory.`.red);
            console.log(err);
            end("bad");
            return;
          }

          console.log(emoji.fist + "  Directory created. \n");
          console.log(
            `${emoji.nerd}  Cloning source repo`.white +
              "  [".grey +
              config.repos.react.grey +
              "]\n".grey
          );

          let Spinner = CLI.Spinner;
          let countdown = new Spinner(
            "Unless your internet sucks, this should be quick...  "
          );

          countdown.start();

          // CLONE REPO
          exec(`git clone ${config.repos.react} ${id}`, err => {
            countdown.stop();

            dotfiles(config)
              .catch(catchError)
              .then(() => {
                // IF THERE'S AN ERROR
                if (err) {
                  console.log(`${emoji.shit}  Error cloning repo.`.red);
                  console.log(err);
                  end("bad");
                  return;
                } else if (hasError) {
                  end("bad");
                  return;
                }

                let configFile = {
                  gifs: config.gifs,
                  packageManageer: config.package
                };

                // REMOVE UNUSED CSS FILES
                if (_.includes(config.css, "sass")) {
                  fs.remove(`${id}/src/css/app.css`);
                  fs.remove(`${id}/src/css/app.styl`);
                  fs.remove(`${id}/src/components/Menu/Menu.css`);
                  fs.remove(`${id}/src/components/Menu/Menu.styl`);
                  fs.remove(`${id}/src/containers/Error/Error.css`);
                  fs.remove(`${id}/src/containers/Error/Error.styl`);
                } else if (_.includes(config.css, "stylus")) {
                  fs.remove(`${id}/.sass-lint.yml`);
                  fs.remove(`${id}/src/css/app.css`);
                  fs.remove(`${id}/src/css/app.scss`);
                  fs.remove(`${id}/src/components/Menu/Menu.css`);
                  fs.remove(`${id}/src/components/Menu/Menu.scss`);
                  fs.remove(`${id}/src/containers/Error/Error.css`);
                  fs.remove(`${id}/src/containers/Error/Error.scss`);
                } else {
                  fs.remove(`${id}/.sass-lint.yml`);
                  fs.remove(`${id}/src/css/app.scss`);
                  fs.remove(`${id}/src/css/app.styl`);
                  fs.remove(`${id}/src/components/Menu/Menu.scss`);
                  fs.remove(`${id}/src/components/Menu/Menu.styl`);
                  fs.remove(`${id}/src/containers/Error/Error.scss`);
                  fs.remove(`${id}/src/containers/Error/Error.styl`);
                }

                // ENABLE FIREBASE
                if (_.includes(config.hosting, "firebase")) {
                  configFile.firebase = true;
                } else {
                  configFile.firebase = false;
                  fs.remove(`${id}/firebase.json`);
                  fs.remove(`${id}/functions`);
                }

                // ENABLE HEROKU
                if (_.includes(config.hosting, "heroku")) {
                  configFile.heroku = true;
                } else {
                  configFile.heroku = false;
                  fs.remove(`${id}/Procfile`);
                }

                // ENABLE DOCKER
                if (_.includes(config.hosting, "docker")) {
                  configFile.docker = true;
                } else {
                  configFile.docker = false;
                  fs.remove(`${id}/Dockerfile`);
                  fs.remove(`${id}/docker-compose.yml`);
                }

                // ENABLE ZEIT NOW
                if (_.includes(config.hosting, "docker")) {
                  configFile.zeit = true;
                } else {
                  configFile.zeit = false;
                  fs.remove(`${id}/.nowignore`);
                  fs.remove(`${id}/docker-compose.yml`);
                }

                setNames(config).then(() => {
                  fs.remove(`${id}/.git`);

                  let cmd = "yarn";
                  let start = "yarn dev";

                  // if (config.css)

                  if (config.package === "npm") {
                    cmd = "npm install";
                    start = "npm run dev";
                    if (fs.existsSync(`${id}/yarn.lock`))
                      fs.remove(`${id}/yarn.lock`);
                  } else {
                    if (fs.existsSync(`${id}/package-lock.json`))
                      fs.remove(`${id}/package-lock.json`);
                  }

                  // UPDATE README

                  let readme = `${id}/README.md`;

                  if (fs.existsSync(readme)) {
                    fs.readFile(readme, "utf8", (err, data) => {
                      let readmeData = `
                      #${config.default.name}
                      ${config.default.description}
                    `;

                      fs.writeFile(readme, readmeData, "utf8", err => {
                        if (err) return console.log(err);
                      });
                    });
                  }

                  // INSTALL SCRIPTS
                  if (config.install) {
                    console.log(
                      `${emoji.cyclone}  Installing client dependencies with ${
                        config.package
                      } (sit tight, this might take a sec).`.white
                    );

                    if (config.gifs) {
                      let gifs = [];

                      fs.readdirSync(`${ROOT_DIR}/gifs/`).forEach(file => {
                        gifs.push(`${ROOT_DIR}/gifs/${file}`);
                      });

                      gif(gifs[Math.floor(Math.random() * gifs.length)]);
                    } else {
                      console.log("\n");
                    }

                    let install = exec(
                      `${cmd} && ${config.package} run ssl`,
                      { cwd: id },
                      err => {
                        if (err) {
                          console.log(err);
                          end("bad");
                        } else {
                          if (_.includes(config.hosting, "firebase")) {
                            console.log(
                              `${
                                emoji.cyclone
                              }  Installing server dependencies with ${
                                config.package
                              } (this may take a bit too).`.white
                            );

                            install = exec(
                              cmd,
                              { cwd: `${id}/functions` },
                              err => {
                                if (err || hasError) {
                                  end("bad");
                                } else {
                                  end(
                                    "installed",
                                    `\n${emoji.done}  All done! cd into `
                                      .white +
                                      `${"/".blue + "".blue + id.blue}` +
                                      " and run ".white +
                                      `${start}`.blue +
                                      " to start your app.\n".white
                                  );
                                }
                              }
                            );
                          } else {
                            if (err || hasError) {
                              end("bad");
                            } else {
                              end(
                                "installed",
                                `\n${emoji.done}  All done! cd into `.white +
                                  `${"/".blue + "".blue + id.blue}` +
                                  " and run ".white +
                                  `${start}`.blue +
                                  " to start your app.\n".white
                              );
                            }
                          }
                        }
                      }
                    );

                    install.stdout.on("data", data => {
                      log("[".grey + config.package.grey + "] ".grey + data);
                    });
                  } else {
                    end(
                      "installed",
                      `\n${emoji.done}  All done! cd into `.white +
                        `${"/".blue + "".blue + id.blue}` +
                        " and run ".white +
                        cmd.blue +
                        " to complete installation.\n".white
                    );
                  }
                });
              });
          });
        });
      });
    })
    .catch();
};
