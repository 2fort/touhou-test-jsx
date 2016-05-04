const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

var webpackPlugins = [
    new HtmlWebpackPlugin({
        title: 'Touhou-test',
        template: './src/my-index.ejs',
        inject: 'body'
    }),
    new webpack.DefinePlugin({
        "process.env": { 
            NODE_ENV: JSON.stringify(NODE_ENV) 
        }
    })
];

var productionPlugins = [
    new webpack.optimize.UglifyJsPlugin()
];

if (NODE_ENV == 'production') {
    webpackPlugins = webpackPlugins.concat(productionPlugins);
}

module.exports = {
    
    entry: {
        app: ['./src/js/app.js']
    },
    
    output: {
        path: './build',
        filename: '[name].bundle.js'
    },
    
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!' + 'resolve-url!' + 'css?sourceMap'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style!' + 'resolve-url!' + 'css?sourceMap' + '!sass?sourceMap'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(json)$/,
                exclude: /node_modules/,
                loader: 'json'
            },
            {
                test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: "url"
            },
            /*{
                test: /\.png/,
                exclude: /node_modules/, 
                loader: 'url?limit=20000' 
            }*/
            {
                test: /\.(png|jpg|jpeg)$/,
                exclude: /node_modules/, 
                loader: 'url?limit=100000&name=img/[hash].[ext]'
            },
        ]
    },
    
    plugins: webpackPlugins,
    
    devtool: NODE_ENV == 'development' ? 'source-map' : null
};
