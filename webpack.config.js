
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ClearWebpack = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const BrowserWebpackPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle-[hash:7].js',
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },

            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                        
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: './../'
                            }

                        },
                        
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                import: true,
                                minimize: false,

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
                exclude: /node_modules/,
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
                test: /\.(woff|woff2)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: 'fonts/[name].[ext]',
                    }
                }
            },

            {
                test: /\.html$/,
                exclude: /node_modules/,
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
            filename: 'css/[name]-[hash:7].css',
        }),
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new webpack.ProvidePlugin({
            $: ['jquery'],
            jQuery: ['jquery'],
            'window.jQuery': 'jquery',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new BrowserWebpackPlugin({
            hot: 'localhost',
            port: 9100,
            proxy: 'http://localhost:9001',
        }, {
            reload: false
        }),

        new webpack.HashedModuleIdsPlugin()
    ]     
};