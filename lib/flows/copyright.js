module.exports = (config) => {
  return {
    name: 'copyright',
    type: 'input',
    default: () => {
      return `${config.default.copyright}`
    },
    message: 'Name for copyright (i.e. "Copyright (c) 2018 <Foobar, Inc.>',
    filter: (value) => {

      return new Promise((resolve, reject) => {
        if (value.length) {
          config.copyright = value
          resolve(value)
        }
        reject('Please enter a copyright name')
      })

    }
  }
}
