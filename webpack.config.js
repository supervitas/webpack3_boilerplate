const path = require("path");
const isProd = process.env.NODE_ENV === 'production';

const plugins = [];

module.exports = {  
    entry: {
        app: ["./src/app.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist/',
        filename: "bundle.js"
  },
    performance: {
    hints: "warning", // enum
    maxAssetSize: 2000000, // int (in bytes),
    maxEntrypointSize: 4000000, // int (in bytes)
    assetFilter: function(assetFilename) { 
        // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
     module: {
        rules: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=dist/images/[name].[ext]' },
            { test: /\.woff2?$/, loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=dist/fonts/[name].[ext]' }
        ]
  },
  devtool: isProd ? 'none' : 'eval-source-map',
  plugins,

};
