
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ClearWebpack = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
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
    },

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
                test: /\.(jpg|jpeg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                        }
                    },

                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 80
                            },
                            web: {
                                quality: 80
                            }
                        }
                    }
                    
                ]    
                
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            attrs: ['img:src']
                        }
                    }
                ]
            }

        ]        
    },

    plugins: [
        new ClearWebpack('dist'),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]     
};