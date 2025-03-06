const path = require('node:path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const ioHost = process.env.IO_HOST || 'localhost:3000';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: [
    './src/index.scss',
    // './src/index.ts',
    './src/libs/bootstrap.ts'
  ],
  devtool: !isProduction && 'inline-source-map',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'target'),
    clean: true,
    publicPath: '/'
  },
  devServer: {
    compress: true,
    hot: true,
    watchFiles: [
      'src/**/*.js',
      'src/**/*.css',
      'src/**/*.ts',
      'src/**/*.scss',
      'src/index.html'
    ],
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    headers: {
      'Cache-Control': 'no-store',
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            // loader: 'style-loader'
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
            options: { url: false }
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.scss', '.css', '.js', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      IO_HOST: JSON.stringify(ioHost)
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/**/*', context: 'src', noErrorOnMissing: true }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css'
    })
  ]
};
