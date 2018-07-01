const BrowserWebpackPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ClearWebpack = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

exports.loadJS = ({
    test = /\.js$/,
    exclude = /node_modules/,
} = {}) => {
    return {
        module: {
            rules: [
                {
                    test,
                    exclude,
                    use: 'babel-loader',
                }
            ]
        }
    }
}

exports.loadSASS = ({
     extractOptions = {
        filename: 'css/style-[hash:7].css',
    },
    cssMinimizeOptions = {
        minimize: false
    },

} = {}) => {
    return {
        module: {
            rules: [
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
                                    minimize: cssMinimizeOptions
    
                                }
                            },
    
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: (loader) => [
                                        new require('autoprefixer')(),
                                    ],
                                    sourceMap: true
                                }
                            },
                            
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ],
    
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin(extractOptions),
        ]
    }
}

exports.loadImg = ({
    fileOptions = {
         name: 'img/[name].[ext]', 
    },
    imageOptions,
    isDev = false
} = {}) => {

    const loaders = [{
        loader: 'file-loader',
        options: fileOptions,
    }];

    if (isDev === false) {
        loaders.push({
            loader: 'image-webpack-loader',
            options: imageOptions,
        });
    }

    return {
        module: {
            rules: [
                {
                    test: /\.(jpg|jpeg|png)$/,
                    exclude: /node_modules/,
                    use: loaders   
                }
            ]
        }
    }
}

exports.loadFonts = ({
    test = /\.(woff|woff2)$/,
    exclude = /node_modules/,
    options = {
        limit: 10,
        name: 'fonts/[name].[ext]',
    }
} = {}) => {

    return {
        module: {
            rules: [
                {
                    test,
                    exclude,
                    use: {
                        loader: 'url-loader',
                        options
                    }
                }
            ]
        }
    }
}

exports.loadHTML = ({
    pluginsOptions,
    minimizeOptionsHtml
} = {}) => {

    return {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: minimizeOptionsHtml,
                                attrs: ['img:src']
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HTMLPlugin(pluginsOptions)
        ]
    }
}


exports.ClearWebpack = ({ paths, options }) => {

    return {
        plugins: [
            new ClearWebpack(paths, options),
        ]
    }
}


exports.ProvidePlugin = () => {

    return {
        plugins: [
            new webpack.ProvidePlugin({
                $: ['jquery'],
                jQuery: ['jquery'],
                'window.jQuery': 'jquery',
            }),
        ]
    }
}

exports.HashedModulePlugin = () => {

    return {
        plugins: [
            new webpack.HashedModuleIdsPlugin()
        ]
    }
}

exports.devServer = ({
    port = 9001,
    hot = true,
    overlay = true,
    contentBase
} = {}) => {

    const plugins = [];

    if(hot = true) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        )
    }

    return {
        devServer: {
            port,
            contentBase,
            hot,
            overlay
        },
        plugins
    }
}

exports.BrowserSync = ({
    hot = 'localhost',
    port = 9100,
    proxy = 'http://localhost:9001',
    options = {
        reload: false
    }
} = {}) => {
    return {
        plugins: [
            new BrowserWebpackPlugin({
                hot,
                port,
                proxy
            }, options),
        ]
    }
}