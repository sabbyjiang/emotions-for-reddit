// Has to be named this so that webpack knows where to find it

// Specify two things: entry point for web-pack (where our project starts and where it should find where modules are dependent on each other)


// Module that is built into node gives us the ability to access the node tree
// Use it create the output path
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    // Start here and build upwards from here
    entry: './src/index.js',
    // specifying where the compiled js goes
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
                // use: ['style-loader', 'css-loader'],
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                }),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        // takes our css and then create a new file called style.css
        new ExtractTextPlugin('style.css')
    ]
}

module.exports = config;