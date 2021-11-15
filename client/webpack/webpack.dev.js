const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 3000,
    writeToDisk: true,
    proxy: {
      '/': 'http://localhost:5080',
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('development'),
    }),
  ],
}
