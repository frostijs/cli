module.exports = (config) => {
  return {
    name: 'license',
    type: 'list',
    default: 'MIT',
    message: 'Licence',
    choices: [{
        value: 'MIT',
        checked: true
      }, {
        value: 'Apache',
        checked: false
      }, {
        value: 'BSD',
        checked: false
      }, {
        value: 'GPL',
        checked: false
      }
    ],
    filter: (value) => {

      config.license = value.toLowerCase()

      return new Promise((resolve, reject) => {
        resolve(value.toLowerCase())
      })

    }
  }
}