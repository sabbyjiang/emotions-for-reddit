const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
    filename: 'style.css'
});
const extractSCSS = new ExtractTextPlugin({
    filename: 'main.css'
})

const config = {
    entry: [
    './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            },
            {
                use: extractCSS.extract({
                    use: 'css-loader'
                }),
                test: /\.css$/
            },
            {
                test: /\.scss$/,
                use: extractSCSS.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractCSS,
        extractSCSS
    ]
}

module.exports = config;