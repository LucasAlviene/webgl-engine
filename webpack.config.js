const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    output: {
        filename: 'assets/[contenthash].bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    entry: path.resolve(__dirname, './src/index.ts'),
    module: {
        rules: [
            {
                test: /\.(obj)$/,
                exclude: /node_modules/,
                loader: "./loader/obj.js"
            },
            {
                test: /\.(hlsl)$/,
                exclude: /node_modules/,
                loader: "./loader/hlsl.js"
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "WebGL Engine",
            template: path.resolve(__dirname, "./public/index.html")
        })
    ]
};