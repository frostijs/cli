const fs       = require('fs-extra')
const path     = require('path')

module.exports = {

  // MAKE SURE PATH IS WRITEABLE
  writeable: (path, callback) => {
    fs.access(path, fs.W_OK, (err) => {
      callback(null, !err)
    })
  }

}
