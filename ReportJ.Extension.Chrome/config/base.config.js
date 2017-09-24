var path = require("path");
var webpack = require("webpack");
var CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = function () {
    return {
        entry: {
            background: "./app/background.js",
            popup: "./app/js/popupController.js",
            options: "./app/js/optionsController.js",
        },
        output: {
            filename: "[name].[chunkhash].js",
            path: path.resolve(__dirname, "../build")
        },
        module: {
            rules: [
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
                }
            ]
        },
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "../app")
            },
            extensions: [".js"]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: function (module) {
                    // Assumes that vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf("node_modules") !== -1;
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest"
            }),
            new CleanWebpackPlugin(["build/**"], {
                root: path.resolve(__dirname, "../")
            })
        ]
    };
};