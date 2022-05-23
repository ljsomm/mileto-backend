const NodemonPlugin = require('nodemon-webpack-plugin');

const path = require('path');
module.exports = {
    entry: "./src/server.js",
    target: "node",
    mode: "development",
    externals: ['pg-hstore'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [ new NodemonPlugin() ]
}