var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var baseConfig = require("./base.config");

function getCssLoaders() {
    return [
        "style-loader",
        "css-loader",
        "postcss-loader"
    ];
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