var path = require("path");
var webpack = require("webpack");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var manifest = require("../app/manifest.json");

function getCssLoaders() {
    return [
        {
            loader: "css-loader",
            options: {
                minimize: true
            }
        },
        {
            loader: "postcss-loader"
        }
    ];
}

function getSassLoaders() {
    const cssLoaders = getCssLoaders();
    return cssLoaders.concat([
        {
            loader: "sass-loader",
            options: {
                includePaths: ["node_modules"]
            }
        }
    ]);
}

module.exports = function () {
    return {
        entry: {
            background: "./app/js/background.js",
            popup: "./app/js/popup/index.jsx",
            options: "./app/js/options/app.js",
            content: "./app/js/content/content.js"
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "../app/build")
        },
        module: {
            rules: [
                {
                    test: /\.jsx?/,
                    loader: "babel-loader"
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
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: getCssLoaders()
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: getSassLoaders()
                    })
                },
            ]
        },
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "../app"),
                "app": path.resolve(__dirname, "../app"),
            },
            extensions: [".js", ".jsx"]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new webpack.DefinePlugin({
                NAME: JSON.stringify(manifest.name),
                DESCRIPTION: JSON.stringify(manifest.description),
                VERSION: JSON.stringify(manifest.version),
                HOME_URL: JSON.stringify(manifest.homepage_url),
                // https://github.com/facebook/react/issues/12041
                "__REACT_DEVTOOLS_GLOBAL_HOOK__": "({ isDisabled: true })",
            }),
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
            new CleanWebpackPlugin(["app/build/**"], {
                root: path.resolve(__dirname, "../")
            }),
            new ExtractTextPlugin("[name].css")
        ]
    };
};