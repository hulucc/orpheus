var path = require('path');
var webpack = require('webpack');
var chunk = webpack.optimize.CommonsChunkPlugin;
var html = require('html-webpack-plugin');
var copy = require('copy-webpack-plugin');
var clean = require('clean-webpack-plugin');
var extract = require('extract-text-webpack-plugin');
var production = (process.env.NODE_ENV === 'production');

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = {
        'main': ['./Client/main.ts'],
        'vendor': ['./Client/vendor.ts'],
    };

    config.output = {
        path: root('./wwwroot'),
        filename: 'js/[name].js',
        publicPath: '/',
    };

    config.resolve = {
        extensions: ['', '.ts', '.js', '.css', '.html'],
        modulesDirectories: ['node_modules'],
    }

    config.module = {
        loaders: [
            { test: /\.ts$/, loader: 'ts' },
            { test: /\.css$/, loader: extract.extract('style', 'css'), exclude: root('Client', 'app') },
            { test: /\.css$/, loader: 'raw', include: root('Client', 'app') },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=8192&name=fonts/[name].[hash].[ext]' },
            { test: /\.html$/, loader: 'raw' },
        ]
    };

    config.plugins = [
        new extract("css/styles.css"),
        new chunk('vendor', 'js/vendor.js', Infinity),
        new copy([{ from: root('Client/img'), to: 'img' }]),
    ];

    if (!production) {
        config.devtool = 'cheap-module-eval-source-map';
    }

    if (production) {
        config.plugins.push(
            new clean(['*'], {root: root('./wwwroot')})
        );
    }

    return config;
}();

//helper
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}