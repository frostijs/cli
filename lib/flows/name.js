module.exports = (config) => {
  return {
    name: 'name',
    type: 'input',
    default: config.default.name,
    message: 'What is the name of your application (maximum of 45 characters)',
    filter: ( value ) => {

      return new Promise((resolve, reject) => {
        if (value.length) {
          config.default.name = value
          config.name = value
          config.default.id = value.split(' ').join('-').toLowerCase()
          resolve(value)
        }
        reject('Please enter a project name')
      })

    }
  }
}
