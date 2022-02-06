/**
 * 目的: 可以hot reload, 至少可以刷新看到结果而不用重新编译. 越快越好.
 */
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',

      'webpack-dev-server/client?http://localhost:8080',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates


      "whatwg-fetch",
      "./app/index.jsx"], // 入口文件，单入口 app.jsx 文件
  },
  output: { // 编译后的文件
    path: path.resolve(__dirname, "bundle"),
    publicPath: "/",
    filename: "[name]-[hash].js",
    pathinfo: true
  },
  devtool: "source-map",

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [ //使用特定的加载器 loader 处理特定的文件
      {
        test: /\.(?:js|jsx)$/, // babel-loader 文件过滤规则
        loader: "babel-loader?cacheDirectory",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // url-loader 图片过滤
        loader: 'url-loader?limit=1024&name=res/[hash:8].[name].[ext]'
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader' // Run both loaders
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({template: 'index.tmpl'}),
    new CleanWebpackPlugin(['bundle']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  devServer: {
    historyApiFallback: true, //不跳转
    publicPath: "/",
    contentBase: path.resolve(__dirname, 'bundle'), // 本地服务器加载的页面所在目录
    hot: true,
  }
}
