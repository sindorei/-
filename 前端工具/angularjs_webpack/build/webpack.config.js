const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function MyExampleWebpackPlugin() {

};

// 在它的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定挂载的webpack事件钩子。
  compiler.plugin('emit', function(compilation, callback) {
    console.log("This is an example plugin!!!");
    for(var filename in compilation.assets) {
      if(filename === 'main.html') {
        console.log(compilation.assets[filename].source())
      }
    }
    callback()
  });
};

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  externals: {
    angular: 'angular'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    loaders: [
      { test: /\.html$/, loader: "html-loader" },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        }),

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.template.html',
      inject: true,
      filename: 'index.html',
      minify: {
        removeComments: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks:true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
};