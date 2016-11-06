const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8081',
        'webpack/hot/only-dev-server',
        './src/js/app.js',
    ],

    output: {
        path: '/build',
        publicPath: '/',
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
                loaders: ['style', 'resolve-url', 'css?sourceMap'],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style', 'resolve-url', 'css?sourceMap', 'sass?sourceMap'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?cacheDirectory'],
            },
            {
                test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'url',
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                exclude: /node_modules/,
                loader: 'url?limit=5000&name=img/[hash].[ext]',
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json',
            },
        ],
    },

    resolveUrlLoader: {
        silent: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Touhou | Comiket',
            template: './src/my-index.ejs',
            inject: 'body',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: './src/js',
        historyApiFallback: true,
        hot: true,
        progress: true,
        stats: {
            colors: true,
        },
        port: 8081,
    },
};
