module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? 'http://localhost/project/vue/dist/'
      : '/'
    // configureWebpack: {
    //   output: {
    //     libraryExport: 'default'
    //   }
    // }
  }