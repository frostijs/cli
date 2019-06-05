module.exports = (config) => {
  return {
    name: 'domain',
    type: 'input',
    default: () => {
      return `${config.default.id}.com`
    },
    message: 'What is your domain name',
    filter: ( value ) => {

      return new Promise((resolve, reject) => {
        if (value.length) {
          config.domain = value
          resolve(value)
        }
        reject('Please enter a domain name')
      })

    }
  }
}
