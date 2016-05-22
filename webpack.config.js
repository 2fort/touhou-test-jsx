const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

let webpackPlugins = [
    new HtmlWebpackPlugin({
        title: 'Touhou-test',
        template: './src/my-index.ejs',
        inject: 'body',
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV),
        },
    }),
];

const productionPlugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
];

const developmentPlugins = [
    new webpack.HotModuleReplacementPlugin(),
];

if (NODE_ENV === 'production') {
    webpackPlugins = webpackPlugins.concat(productionPlugins);
} else if (NODE_ENV === 'development') {
    webpackPlugins = webpackPlugins.concat(developmentPlugins);
}

module.exports = {

    entry: {
        app: ['./src/js/app.js'],
    },

    output: {
        path: './build',
        filename: '[name].bundle.js',
    },

    resolve: {
        extensions: ['', '.jsx', '.js'],
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!' + 'resolve-url!' + 'css?sourceMap',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style!' + 'resolve-url!' + 'css?sourceMap!' + 'postcss!' + 'sass?sourceMap',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-2', 'react'],
                },
            },
            {
                test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'url',
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                exclude: /node_modules/,
                loader: 'url?limit=40000&name=img/[hash].[ext]',
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json',
            },
        ],
    },

    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],

    plugins: webpackPlugins,

    devtool: NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : null,
};
