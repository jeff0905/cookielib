const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
export default () => (
    {
        mode: 'production',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'wcookie.js',
            libraryTarget: 'umd',
            globalObject: 'this',
            libraryExport: 'default',
            library: 'wcookie'
        },
        externals: {
            'lodash': {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_'
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'dist/wcookie.js', to: path.resolve(__dirname, './examples/browser/'), force: true }
              ])
        ]
    }
);
