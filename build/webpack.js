const { join }    = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const setup       = require('./setup');

const exclude = /(node_modules|bower_components)/;

const dist = join(__dirname, '../public');

module.exports = (env) => {
  const ENV    = env || process.env.NODE_ENV || 'development';
  const isProd = ENV === 'production';
  
  return {
    entry  : {
      app   : [
        './client/index.js',
        './client/styles/main.scss',
      ],
      vendor: [
        // pull these to a `vendor.js` file
        'preact',
      ],
    },
    output : {
      path      : dist,
      filename  : '[name].[hash].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias     : {
        react      : 'preact',
        'react-dom': 'preact',
      },
    },
    module : {
      rules: [
        {
          enforce: 'pre',
          test   : /\.jsx?$/,
          exclude,
          loader : 'eslint-loader',
          options: {
            cache    : true,
            quiet    : true,
            emitError: false,
          },
        }, {
          test  : /\.jsx?$/,
          exclude,
          loader: 'babel-loader',
        }, {
          test  : /\.scss$/,
          loader: ExtractText.extract({
            use     : [
              {
                loader: `css-loader?sourceMap=${!isProd}`,
              }, {
                loader: 'postcss-loader',
              }, {
                loader: 'resolve-url-loader',
              }, {
                loader: `sass-loader?sourceMap=${!isProd}`,
              },
            ],
            fallback: 'style-loader',
          }),
        }, {
          test  : /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
          loader: isProd ? 'file-loader' : 'url-loader',
        },
      ],
    },
    plugins: setup(isProd),
    devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
    stats  : { colors: true },
  };
};
