const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },

    devtool: 'source-map',
}

const prod = merge([
    parts.loadJS(),
    parts.loadSASS({
        extractOptions: {
            filename: 'css/style.css',
        }
    }),
    parts.loadImg({
       isDev: true
    }),
    parts.loadFonts(),
    parts.loadHTML({
        pluginsOptions : {
            filename: 'index.html',
            template: './src/index.html',
        },
        minimizeOptionsHtml: false
    }),
    parts.ProvidePlugin(),
    parts.CopyWebpackPlugin({
        from: 'server/',
        to: 'server/'
    }),
    parts.devServer({
        contentBase: path.join(__dirname, '../dist')
    }),
    parts.BrowserSync()

]);

module.exports = merge(config, prod);