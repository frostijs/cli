module.exports = (config) => {
  return {
    name: 'author',
    type: 'input',
    default: () => {
      return `${config.default.id} <${config.default.id}.com>`
    },
    message: 'Author name/email',
    filter: ( value ) => {

      console.log('setting author to', value)

      return new Promise((resolve, reject) => {
        config.default.author = value
        if (value.length) {
          resolve(value)
        }
      })

    }
  }
}
