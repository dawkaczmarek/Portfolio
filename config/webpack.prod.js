const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle-[hash:7].js',
        path: path.resolve(__dirname, '../dist')
    },

    devtool: false,
}

const prod = merge([
    parts.ClearWebpack({
        paths: ['dist'],
        options: {
            root: path.resolve(__dirname, '../'),
        }
    }),
    parts.loadJS(),
    parts.loadSASS(),
    parts.loadImg({
        imageOptions :  {
            mozjpeg: {
                progressive: true,
                quality: 80
            },
            pngquant: {
                quality: '65-90',
                speed: 4
            },
            web: {
                quality: 80
            }
        }
    }),
    parts.loadFonts(),
    parts.loadHTML({
        pluginsOptions : {
            filename: 'index.html',
            template: './src/index.html',
        },
        minimizeOptionsHtml: true
    }),
    parts.CopyWebpackPlugin({
        from: 'server/',
        to: 'server/'
    }),
    parts.ProvidePlugin(),
    parts.HashedModulePlugin()

]);

module.exports = merge(config, prod);