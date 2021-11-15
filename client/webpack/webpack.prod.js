const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  cache: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('production'),
    }),
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', './build'),
    chunkFilename: '[name].[chunkhash].chunk.js',
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
        minimize: true,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                allVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'allVendors',
                },
                // utilityVendor: {
                //     test: /[\\/]node_modules[\\/](xlsx|file-saver)[\\/]/,
                //     name: "utilityVendor",
                // },
                main: {
                    test: /[\\/]src[\\/]/,
                    name: "main",
                }
            }
        },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        // sourceMap: true, // Enable source maps. Please note that this will slow down the build
        terserOptions: {
          ecma: 5,
          toplevel: true,
          module: true,
          beautify: false,
          comments: false,
          compress: {
            warnings: false,
            ecma: 5,
            module: true,
            toplevel: true,
          },
          output: {
            comments: false,
            beautify: false,
            indent_level: 2,
            ecma: 5,
          },
          mangle: {
            keep_fnames: true,
            module: true,
            toplevel: true,
          },
        },
      }),
    ],
  },
}
