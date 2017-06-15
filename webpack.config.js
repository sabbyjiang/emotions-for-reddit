const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('style.css');
const extractLESS = new ExtractTextPlugin('style-less.css');

const config = {
    entry: [
    './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            },
            {
                use: extractLESS.extract({
                    use: ['style-loader', 'css-loader', 'less-loader']
                }),
                test: /\.less$/
            },
            {
                use: extractCSS.extract({
                    use: 'css-loader'
                }),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        extractCSS,
        extractLESS
    ]
}

module.exports = config;