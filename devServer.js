
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const path = require('path');

config.entry.app.unshift('webpack-dev-server/client?http://localhost:9000/', 'webpack/hot/dev-server');
config['plugins'].push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy: {
        '/api/*': {
            target: 'http://0.0.0.0:7000/',
            secure: false,
            changeOrigin: true
        }
    },
    hot: true,
    quiet: false,
    inline: true,
    historyApiFallback: true
}).listen(9000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:9000/');
});
