const clear  = require('clear')
const colors = require('colors')
const figlet = require('figlet')

const create = require('./create')
const prompt = require('./prompt')
const config = require('../config.json')

module.exports = () => {

  return new Promise((resolve, reject) => {

    clear() // CLEAR CONSOLE ON START

    console.log(
      figlet.textSync(`${config.setup.name}`, { horizontalLayout: 'full' }).rainbow
    )

    console.log('\n')

    prompt(config).then((conf) => {
      create(conf)
    })

  })

}
