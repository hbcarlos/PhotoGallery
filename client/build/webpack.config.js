const path = require('path');

console.log(path.resolve(__dirname, '../public'));

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../public/'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      { 
        test : /\.css$/, // /\.(css|scss)$/,
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../../node_modules/bootstrap')],
        exclude: /(bower_components)/,
        use: ['style-loader', 'css-loader']
      },
      { 
        test : /\.(gif|png|jpeg|jpg|svg)$/i,
        include: path.resolve(__dirname, '../src'),
        exclude: /(node_modules|bower_components)/,
        use: ['url-loader']
      }
    ]
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  }
};