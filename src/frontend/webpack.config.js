const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const build_path = path.join(__dirname, '../../')
const index_path = path.join(__dirname, '../')
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(build_path, 'build'),
        filename: "js/bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(index_path, 'index.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        })

    ],
    devServer: {
        hot: true,
        port: 7070
    }
}
