module.exports = (config) => {
  return {
    name: 'shortName',
    type: 'input',
    default: config.default.name.split(' ').join('').substring(0, 12),
    message: 'Define a short name (maximum of 12 characters) https://developers.chrome.com/apps/manifest/name',
    filter: ( value, other, again ) => {
      return new Promise((resolve, reject) => {
        if (value.length) {
          config.shortName = value
          resolve(value)
        }
        reject('Please enter a project shortName')
      })

    }
  }
}
