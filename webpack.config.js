
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ClearWebpack = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                import: true
                            }
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    new require('autoprefixer')(),
                                ],
                                sourceMap: true,
                            }
                        },
                        
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }

        ]        
    },

    plugins: [
        new ClearWebpack('dist'),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]     
};