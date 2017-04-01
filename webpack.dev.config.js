/**
 * Created by liudonghui on 17/3/6.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    dev:'webpack-dev-server',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './web/src/index',
        vendor: ["react", "react-dom", "react-router"]
    },
    output: {
        //join and resolve diff
        path: path.join(__dirname,'/public/dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    devServer: {
        publicPath: '/dist/',
        watch:true,
        stats: { colors: true },
        port: 8081,
        //contentBase: 'build',
        noInfo: true,
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename:"vendor.js"
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
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
