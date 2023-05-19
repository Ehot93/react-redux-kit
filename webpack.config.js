/**
 Created: Vladislav Dementyev
 Date: 14.05.2023
 Time: 19:47
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

const plugins = [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
    }),
];
const isProd = 'production' === mode;
const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
    entry: 'index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx'],
        modules: ['src', 'node_modules'],
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
    },
    plugins,
    module: {
        rules: [
            {
                exclude: /node_modules/u,
                test: /\.(js|jsx|tsx)$/u,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/u,
                use: [styleLoader, 'css-loader', 'postcss-loader'],

            },
            {
                test: /\.less$/i,
                use: [
                    styleLoader,
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2)(\?[a-z0-9]+)?$/u,
                use: {
                    loader: 'file-loader',
                    options: {name: 'fonts/[name].[contenthash:5].[ext]'},
                },
            },
            {
                test: /\.svg$/u,
                use: [
                    '@svgr/webpack',
                    {
                        loader: 'file-loader',
                        options: {name: 'images/[name].[contenthash:5].[ext]'},
                    },
                ],
            },
            {
                test: /.*\.(png|jpg|jpeg|gif)$/iu,
                use: {
                    loader: 'file-loader',
                    options: {name: 'images/[name].[contenthash:5].[ext]'},
                },
            },
        ]
    }

}

