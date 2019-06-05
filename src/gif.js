const termImg = require('term-img')

module.exports = (gif) => {
  try {
    console.log('\n')
    termImg(gif, {
      width: '300px'
    })
    console.log('\n')
  } catch (e) {}
}
