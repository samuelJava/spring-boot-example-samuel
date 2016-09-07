var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/main');
var BUILD_DIR = path.resolve(__dirname, 'build/site');

var config = {
    entry: APP_DIR + '/jsx/index.jsx',
    resolve: {
        root: path.resolve('./src/main/jsx'),
        extensions: ['', '.js', '.jsx']
    },
    common: [
        'react', 'react-dom', 'react-router'
    ],
    output: {
        path: BUILD_DIR + '/js',
        publicPath: "/js/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: APP_DIR + '/static',
                to: BUILD_DIR
            }
        ], {
            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: false
        }),
        new webpack.optimize.CommonsChunkPlugin(
        /* chunkName= */
        "common",
        /* filename= */
        "common.bundle.js")
    ]
};

module.exports = config;
