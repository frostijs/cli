module.exports = (config) => {
  return {
    name: 'firebase',
    type: 'input',
    default: () => {
      return `${config.default.id}`
    },
    message: 'Firebase project ID',
    filter: ( value ) => {

      return new Promise((resolve, reject) => {
        if (value.length) {
          config.default.firebase = value
          resolve(value)
        }
        reject('Please enter a firebase project ID')
      })

    }
  }
}
