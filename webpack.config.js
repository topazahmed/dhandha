const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.web.simple.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3002,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Dhandha App',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(@expo\/vector-icons|react-native-vector-icons))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              ['react-native-web', { commonjs: true }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons': 'react-native-vector-icons/dist',
      '@react-native-async-storage/async-storage': path.resolve(__dirname, 'src/mocks/index.ts'),
      '@react-native-google-signin/google-signin': path.resolve(__dirname, 'src/mocks/index.ts'),
      'react-native-fbsdk-next': path.resolve(__dirname, 'src/mocks/index.ts'),
      '../services/authService': path.resolve(__dirname, 'src/services/authService.web.ts'),
      '@react-native-vector-icons/material-design-icons': path.resolve(__dirname, 'src/mocks/index.ts'),
      '@expo/vector-icons/MaterialCommunityIcons': path.resolve(__dirname, 'src/mocks/index.ts'),
      '@expo/vector-icons': path.resolve(__dirname, 'src/mocks/index.ts'),
    },
  },
};