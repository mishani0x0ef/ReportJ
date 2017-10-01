function prepareConfig(env) {
    env = env || {};
    env.environment = env.environment || "dev";

    return env;
}

function buildConfig(env) {
    env = prepareConfig(env);
    return require("./config/" + env.environment + ".config.js")(env);
}

module.exports = buildConfig;