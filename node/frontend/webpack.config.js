const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = path.join(__dirname, '/src');

module.exports = {
  context: appPath,
  mode: 'development',
  devtool: 'source-map',
  entry: ['./index.jsx'],
  output: {
    filename: 'app.[hash].js',
    path: path.resolve(path.join(__dirname, '/dist')),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(path.join(__dirname, '/node_modules')),
      path.resolve(appPath)
    ]
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          includePaths: [appPath]
        }
      }]
    }, 
    {
      test: /\.(scss|sass)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'fast-sass-loader',
        options: {
          includePaths: [appPath]
        }
      }]
    }, { 
      test: /\.(png|jpg|svg)$/, 
      loader: 'url-loader?limit=100000'
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'assets/**/*' }
    ]),
    // Enable HMR.
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    inline: true,
    sockPort: '0', // To use `location.port` from client.
    watchOptions: {
      poll: true
    },
    proxy: {
      '/api': 'http://movies-api:8080'
    }
  }
};