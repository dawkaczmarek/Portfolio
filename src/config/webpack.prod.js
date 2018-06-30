const merge =require('webpack-merge');

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'source-map',
    devServer: {
        port: 9001,
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        overlay: true,
    }

}

const prod = merge([]);

module.exports = merge(config, prod);