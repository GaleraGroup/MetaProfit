const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = function () {
    const config =  {
        runtimeChunk: 'single',
        splitChunks: { 
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
    const loaders = [{
            loader: MiniCssExtractPlugin.loader
        },
        'css-loader'
    ]
    if (extra) {
        loaders.push(extra)
    }

    return loaders;
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({          
            title: 'MetaProfit Dashboard',
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: path.resolve(__dirname, 'src/favicon.ico'),
        //         to: ''
        //     }]
        // }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ]

    // if (isDev) {
    //     base.push(
    //         new ESLintPlugin({
    //             files: '@/**/*.js',
    //             extensions: 'js',
    //             exclude: 'node_modules'
    //             }
    //         )
    //     )
    // }

    // if (isProd) {
    //      base.push(new BundleAnalyzerPlugin())
    // }

    return base;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill','./index.js']
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/js/components'),
            '@services': path.resolve(__dirname, 'src/js/components/services'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
        watchFiles: {
            paths: ['src/**/*'],
        }
    },
    devtool: isDev ? 'source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext]'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext]'
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}

//Подключить и настроить babel +
//ESLint?
//Потом допилить обработку и оптимизацию изображений на лету
//Подключить фавикон