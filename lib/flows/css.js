module.exports = (config) => {
    return {
      name: 'css',
      type: 'list',
      default: 'Sass',
      message: 'What would you like to use for your styles',
      choices: [
        {
          value: 'Sass',
          checked: true
        }, {
          value: 'Stylus',
          checked: false
        }, {
          value: 'Post CSS (with postcss-preset-env)',
          checked: false
        }
      ],
      filter: ( value ) => {
  
        config.css = value.toLowerCase()
  
        return new Promise((resolve, reject) => {
          resolve(value.toLowerCase())
        })
  
      }
    }
  }
  