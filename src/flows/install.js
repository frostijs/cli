module.exports = (config) => {
  return {
    name: 'install',
    type: 'list',
    default: 'Yep',
    message: 'Last question, should I install dependencies when we\'re done?',
    choices: [
      {
        value: 'Yep',
        checked: true
      },
      {
        value: 'Nah',
        checked: false
      }
    ],
    filter: ( value ) => {

      config.install = value === 'Yep' ? true : false

      return new Promise((resolve, reject) => {
        resolve(value)
      })

    }
  }
}
