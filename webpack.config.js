const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: { main: './app/js/main.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  watchOptions: {
    ignored: /node_modules/
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      },
     
      {
        test    : /\.(sass|css)$/,
        exclude : /(node_modules)/,
        loader  : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {loader: 'css-loader'},
                {loader: 'sass-loader'},
            ]
        })
    },
    ]
  },
  plugins: [ 
    new ExtractTextPlugin({filename: 'style.css'})
  ]
};;