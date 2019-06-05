module.exports = (config) => {
  return {
    name: 'description',
    type: 'input',
    default: ' ',
    message: 'Description of your application (for package & manifest files)',
    filter: ( value ) => {

      return new Promise((resolve, reject) => {
        if (value.length && value !== ' ') {
          config.default.description = value
          resolve(value)
        } else {
          config.default.description = ''
          resolve(value)
        }
      })

    }
  }
}
