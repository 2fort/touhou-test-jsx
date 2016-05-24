const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        app: ['./src/js/app.js'],
    },

    output: {
        path: './build',
        filename: '[hash].bundle.js',
    },

    resolve: {
        extensions: ['', '.jsx', '.js'],
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!' + 'resolve-url!' + 'css',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style!' + 'resolve-url!' + 'css!' + 'postcss!' + 'sass?sourceMap',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
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

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Touhou-test',
            template: './src/my-index.ejs',
            inject: 'body',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                screw_ie8: true,
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
};
