var webpackMerge = require("webpack-merge");
var baseConfig = require("./base.config");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (env) {
    var base = baseConfig(env);

    return webpackMerge(base, {
        devtool: "nosources-source-map",
        plugins: [
            new UglifyJSPlugin({
                comments: false
            })
        ]
    });
}