var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var baseConfig = require("./base.config");

module.exports = function (env) {
    var base = baseConfig(env);

    return webpackMerge(base, {
        devtool: "cheap-module-source-map"
    });
}