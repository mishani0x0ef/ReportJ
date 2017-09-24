var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var baseConfig = require("./base.config");

function getCssLoaders() {
    return ["style-loader", "css-loader", "postcss-loader"];
}

function getLessLoaders() {
    return ["less-loader"];
}

module.exports = function (env) {
    var base = baseConfig(env);

    return webpackMerge(base, {
        devtool: "cheap-module-source-map",
        module: {
            rules: [
                // {
                //     test: /\.css$/,
                //     use: getCssLoaders()
                // },
                // {
                //     test: /\.less$/,
                //     use: getCssLoaders().concat(getLessLoaders())
                // }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("debug")
                },
                DEBUG: JSON.stringify(true)
            })
        ]
    });
};