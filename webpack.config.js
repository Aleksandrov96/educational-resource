const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: ['@babel/polyfill', './src/index.tsx']
    },
    devServer: {
      static: './dist',
      historyApiFallback: true,
      open: true,
      hot: true,
      compress: true
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './public/index.html',
            filename: 'index.html',
            favicon: './src/images/logo.png'
        }),
        new ESLintPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ],
    resolve: {
      alias: {
        images: path.resolve(__dirname, 'src/images'),
        '@': path.resolve(__dirname, 'src'),
      },
      extensions : ['.js', '.json', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          { 
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.m?tsx$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript']
              }
            }
          },
        ]
    }
}