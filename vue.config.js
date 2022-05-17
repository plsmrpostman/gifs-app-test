module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/gifs-preview/'
    : '/',
  pwa: {
      themeColor: '#17a2b8',
      msTileColor: '#000000',
      iconPaths: {
        msTileImage: 'img/icons/mstile-150x150.png'
      }
    }
}
