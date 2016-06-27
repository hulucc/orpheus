var path = require('path');
var webpack = require('webpack');
var chunk = webpack.optimize.CommonsChunkPlugin;
var html = require('html-webpack-plugin');
var copy = require('copy-webpack-plugin');
var extract = require('extract-text-webpack-plugin');
var production = (process.env.NODE_ENV === 'production');

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = {
        'main': ['./Client/main.ts'],
    };

    config.output = {
        path: root('wwwroot'),
        filename: 'js/[name].js',
        publicPath: '/',
    };

    config.resolve = {
        root: root('Client'),
        extensions: ['', '.ts', '.js'],
        modulesDirectories: ['node_modules'],
    }

    config.module = {
        loaders: [
            { test: /\.ts$/, loader: 'ts' },
            { test: /\.css$/, loader: extract.extract('style', 'css'), exclude: root('Client', 'app') },
            { test: /\.css$/, loader: 'raw', include: root('Client', 'app') },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=102400&name=assert/[name].[hash].[ext]' },
            { test: /\.html$/, loader: 'html' },
        ]
    };

    config.plugins = [
        new extract('css/styles.css'),
        //new chunk('vendor', 'js/vendor.js', Infinity),
        new webpack.DllReferencePlugin({
            context: root(),
            manifest: require('./wwwroot/js/vendor-manifest.json'),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ];

    if (!production) {
        config.devtool = 'cheap-module-eval-source-map';
    }

    if (production) {
        config.htmlLoader = {
            minimize: false
        }
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false}})
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