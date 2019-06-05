const emoji    = require('./emoji')

module.exports = (type, msg) => {
  if (type === 'bad') console.log('fin. \n'.red)
  else if (type === 'installed') console.log(msg)
  else console.log(`${emoji.done}  All done. Woo hoo! \n`.blue)
}
