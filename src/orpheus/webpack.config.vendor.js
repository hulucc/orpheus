var path = require('path');
var webpack = require('webpack');
var clean = require('clean-webpack-plugin');
var extract = require('extract-text-webpack-plugin');

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = {
        'vendor': ['./Client/vendor.ts'],
    };

    config.output = {
        path: root('wwwroot'),
        filename: 'js/[name].js',
        library: '[name]_[hash]',
    };

    config.resolve = {
        extensions: ['', '.js']
    };

    config.module = {
        loaders: [
            { test: /\.ts$/, loader: 'ts' },
            { test: /\.css$/, loader: extract.extract('style', 'css'), exclude: root('Client', 'app') },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=102400&name=assert/[name].[hash].[ext]' },
        ]
    };

    config.plugins = [
        new clean(['*'], { root: root('./wwwroot') }),
        new extract('css/vendor.css'),
        new webpack.DllPlugin({
            path: root('wwwroot', 'js', '[name]-manifest.json'),
            name: '[name]_[hash]'
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ]

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