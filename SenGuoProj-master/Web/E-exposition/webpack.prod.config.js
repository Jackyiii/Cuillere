/**
 * 目的: Uglify&minify, 同时分离dll
 */
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: ["./app/index.jsx"], // 入口文件，单入口 app.jsx 文件
  },
  output: { // 编译后的文件
    path: path.resolve(__dirname, "bundle"),
    publicPath: "/",
    filename: "[name]-[hash].js",
    pathinfo: true
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [ //使用特定的加载器 loader 处理特定的文件
      {
        test: /\.(?:js|jsx)$/, // babel-loader 文件过滤规则
        loader: "babel-loader?cacheDirectory",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015", "stage-2"] // es2015 处理 ES语法， react 处理 jsx 语法
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // url-loader 图片过滤
        // loader: 'url-loader?limit=1024&name=res/[hash:8].[name].[ext]'
        loader: 'url-loader'
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader' // Run both loaders
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['bundle']),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor/vendors-manifest.json')
    }),
    new HtmlWebpackPlugin({template: 'index.prod.tmpl'}),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      }
    })
  ]
}
