// Has to be named this so that webpack knows where to find it

// Specify two things: entry point for web-pack (where our project starts and where it should find where modules are dependent on each other)


// Module that is built into node gives us the ability to access the node tree
// Use it create the output path
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const webpack = require('webpack');
const extractCSS = new ExtractTextPlugin('style.css');
const extractLESS = new ExtractTextPlugin('style-less.css');

const config = {
    // Start here and build upwards from here
    entry: [
    //  // listen to code updates emitted by hot middleware:
    // 'webpack-hot-middleware/client',  
    // 'react-hot-loader/patch', 
    './src/index.js',
    ],
    // specifying where the compiled js goes
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        // publicPath: path.resolve(__dirname, 'static'),
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
                // use: ['style-loader', 'css-loader'],
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
        // takes our css and then create a new file called style.css
        // new ExtractTextPlugin('style.css'),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
    ]
}

module.exports = config;