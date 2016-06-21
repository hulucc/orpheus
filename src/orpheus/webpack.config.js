var path = require('path');
var webpack = require('webpack');
var html = require('html-webpack-plugin');
var copy = require('copy-webpack-plugin');
var clean = require('clean-webpack-plugin');

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = {
        'css': './Client/css.ts',
        'vendor': './Client/vendor.ts',
        'app': './Client/main.ts'
    };

    config.output = {
        path: root('./wwwroot'),
        filename: 'js/[name].js'
    };

    config.resolve = {
        root: root(),
        extensions: ['', '.ts', '.js', '.css', '.html'],
    }

    config.module = {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.css$/,
                exclude: root('Client', 'app'),
                loader: 'style!css'
            },
            {
                test: /\.css$/,
                include: root('Client', 'app'),
                loader: 'raw'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=fonts/[name].[hash].[ext]?'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
        ]
    };

    config.plugins = [
        new copy([
            {
                from: root('Client/img'),
                to: 'img'
            }
        ])
    ];

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

function packageSort(packages) {
    // packages = ['polyfills', 'vendor', 'app']
    var len = packages.length - 1;
    var first = packages[0];
    var last = packages[len];
    return function sort(a, b) {
        // polyfills always first
        if (a.names[0] === first) {
            return -1;
        }
        // main always last
        if (a.names[0] === last) {
            return 1;
        }
        // vendor before app
        if (a.names[0] !== first && b.names[0] === last) {
            return -1;
        } else {
            return 1;
        }
    }
}