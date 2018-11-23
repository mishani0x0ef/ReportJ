const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const manifest = require("./app/manifest.json");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: {
        background: "./app/js/background/background.js",
        popup: "./app/js/popup/index.jsx",
        options: "./app/js/options/index.jsx",
        content: "./app/js/content/content.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve("app/dist")
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: "file-loader?name=images/[name].[ext]"
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader?name=fonts/[name].[ext]"
            },
            {
                test: /\.html$/,
                use: "raw-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["node_modules"]
                        }
                    },
                ],
            },
        ]
    },
    resolve: {
        alias: {
            "app": path.resolve(__dirname, "app"),
        },
        extensions: [".js", ".jsx"]
    },
    plugins: [
        // uncomment to exam bundle size
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            NAME: JSON.stringify(manifest.name),
            DESCRIPTION: JSON.stringify(manifest.description),
            VERSION: JSON.stringify(manifest.version),
            HOME_URL: JSON.stringify(manifest.homepage_url),
        }),
        new CleanWebpackPlugin(["app/dist/**"]),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
    devtool: devMode ? "cheap-module-source-map" : undefined,
    optimization: {
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new TerserPlugin({
                parallel: true,
                cache: true,
                extractComments: true
            })
        ],
    },
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty",
    }
}