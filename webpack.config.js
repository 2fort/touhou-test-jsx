const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
];

var developmentPlugins = [
    new webpack.HotModuleReplacementPlugin()
];

if (NODE_ENV == 'production') {
    webpackPlugins = webpackPlugins.concat(productionPlugins);
} else if(NODE_ENV == 'development') {
    webpackPlugins = webpackPlugins.concat(developmentPlugins);
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
                loader: 'style!' + 'resolve-url!' + 'css?sourceMap!' + 'postcss!' + 'sass?sourceMap'
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
                test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: "url"
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                exclude: /node_modules/, 
                loader: 'url?limit=40000&name=img/[hash].[ext]'
            },
        ]
    },
    
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    
    plugins: webpackPlugins,
    
    devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : null
};
