module.exports = (config) => {
  return {
    name: 'package',
    type: 'list',
    default: 'NPM',
    message: 'NPM or Yarn?',
    choices: [
      {
        value: 'Yarn',
        checked: true
      },
      {
        value: 'NPM',
        checked: false
      }
    ],
    filter: ( value ) => {

      config.package = value.toLowerCase()

      return new Promise((resolve, reject) => {
        resolve(value.toLowerCase())
      })

    }
  }
}
