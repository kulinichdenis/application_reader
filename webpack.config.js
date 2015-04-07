module.exports = {
  entry: __dirname + "/src/main",
  devtool: 'source-map',
  output: {
    path: __dirname + "/public",
    filename: "main.js",
    publicPath: "./public/",
  },
  module: {
    loaders: [
//       { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.json$/, loader: 'json' }
    ]
  }
}