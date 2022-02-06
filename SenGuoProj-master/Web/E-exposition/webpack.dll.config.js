const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let obj = JSON.parse(fs.readFileSync("./package.json"));

const readDir = dir => {
  const result = [];
  fs.readdirSync(dir).map(file => {
    if (file.match(/\.js$/)) result.push(`${dir.replace('./node_modules/', '')}/${file}`);
    else if (fs.lstatSync(dir + '/' + file).isDirectory()) result.push(...readDir(dir + '/' + file));
  });
  return result
}

let dep = Object.keys(obj.dependencies); //.concat(PROD ?[] : Object.keys(obj.devDependencies));
dep = dep.filter((name) => {return name !== "babel-runtime"});

const library = '[name]_lib';
module.exports = {
  entry: {
    vendors: dep
  },

  output: {
    filename: '[name].dll.js',
    publicPath: "/",
    path: path.resolve(__dirname, "vendor"),
    library: library
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'vendor/[name]-manifest.json'),
      // This must match the output.library option above
      name: library
    }),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ]
}
