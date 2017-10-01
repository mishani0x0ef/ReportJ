var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var baseConfig = require("./base.config");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (env) {
    var base = baseConfig(env);

    return webpackMerge(base, {
        devtool: "nosources-source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                "presets": [
                                    [
                                        "es2015",
                                        { "modules": false }
                                    ]
                                ],
                            }
                        }
                    ],
                    exclude: /node_modules/,
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                DEBUG: JSON.stringify(false)
            }),
            new UglifyJSPlugin({
                comments: false
            })
        ]
    });
};