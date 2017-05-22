var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanPlugin = require("clean-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    dev:'webpack-dev-server',
    // devtool: 'cheap-module-source-map',
    devtool: 'source-map',
    entry: {
        main: './web/src/index',
        vendor: ["react", "react-dom", "react-router"]
    },
    output: {
        //join and resolve diff
        path: path.join(__dirname,'/public/dist'),
        filename: '[name].[chunkhash].js',
        sourceMapFilename: '[file].map',
        publicPath: '/dist/'
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false  // remove all comments
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            sourceMap: true
        }),
        new WebpackMd5Hash(),
        new CleanPlugin(['public/dist', 'public/index.html']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename:"vendor.js"
        }),
        new HtmlWebpackPlugin({
            template: './web/index.html',
            filename: '../index.html'
        }),
        new ExtractTextPlugin("[name].[contenthash].css"),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json']
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: __dirname
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url-loader',
            query: {limit: 10240}
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
            test: /\.less$/,
            loader:  ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
            include: __dirname
        }
    ]
  }
};
