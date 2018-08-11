const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = false;
// const devMode = process.env.NODE_ENV !== 'development'

const HtmlWebpackPlugin = require('html-webpack-plugin');
const src = path.join(__dirname, 'src');

module.exports = {
  mode: "development",
  entry: {
    "home": path.resolve(__dirname,"./src/js/modules/home.js"),
    "contact": path.resolve(__dirname,"./src/js/modules/contact.js"),
  },
  output: {
    path: __dirname+"/dist/",
    filename: "assets/js/[name].js",
    publicPath:"/"
  },
  devServer:{
    port: 8000,
    allowedHosts: [
      'host.com'
    ]
  },
  module:{
    rules:[
      { 
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use:[
          {

            loader: "babel-loader",
            query:{
              presets:["es2015"]
            }
          }
        ],
      },
      {
        test:/\.pug$/,
        use:[
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options:{
              pretty:true
            }
          },
        ],
      },
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'assets/css/[name].css' : 'assets/css/[name].[hash].css',
      chunkFilename: devMode ? 'assets/css/[id].css' : 'assets/css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'index',
      chunks:["home"],
      filename:"index.html",
      template: path.join(src, '/pug/pages/home.pug'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'contacto',
      chunks:["contact"],
      filename:"contacto.html",
      template: path.join(src, '/pug/pages/contact.pug'),
    }),
  ]
};