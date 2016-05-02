var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    
    entry: {
        app: ['./src/js/app.jsx']
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
                loader: 'json-loader'
            },
            {
                test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: "url-loader"
            },
            {
                test: /\.png/, 
                loader: 'url?limit=100000&minetype=image/png' 
            },
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Touhou-test',
            template: './src/my-index.ejs',
            inject: 'body'
        })
    ],
    
    devtool: 'source-map'
    
};