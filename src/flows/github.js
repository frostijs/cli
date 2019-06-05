module.exports = (config) => {
  return {
    name: 'github',
    type: 'input',
    default: () => {
      return config.default.id
    },
    message: 'Github username (optional)',
    filter: ( value ) => {

      console.log('setting github to', value)

      return new Promise((resolve, reject) => {
        config.default.github = value
        if (value.length) {
          resolve(value)
        }
      })

    }
  }
}
