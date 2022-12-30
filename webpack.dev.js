const webpack = require("webpack");
const path = require("path");
const htmlWebockPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {

                test: /\.scss$/
                ,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            }

        ],

    },
    plugins: [

        new htmlWebockPlugin({
            template: "./src/client/views/index.html"
        }),
        new WorkboxPlugin.GenerateSW(),
    ],

}