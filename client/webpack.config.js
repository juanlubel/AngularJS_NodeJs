const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const build_path = path.join(__dirname, '../server')
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
            title: 'Angular1.5 NodeJs',
            filename: 'index.html',
            template: 'template-index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' },],

            },
        ]
    },
    devServer: {
        hot: true,
        port: 7070
    }
}
