const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.BABEL_ENV = 'production';

module.exports = (env, argv) => {
  return {
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '/temp_cache'),
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      // clean: true,
    },
    // snapshot: {
    //   module: {
    //     hash: true,
    //   },
    //   resolve: {
    //     hash: true,
    //   },
    // },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              exclude: /src/,
              use: [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                  },
                },
              ],
            },
            {
              test: /\.less$/,
              use: [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                  },
                },
                { loader: 'less-loader' },
              ],
            },
            {
              test: [/\.(bmp|woff|gif|jpe|png|ttf|svg|eot)$/],
              type: 'asset/resource',
              // options: {
              //   name: 'static/media/[name].[hash:8].[ext]',
              // },
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              use: [
                'thread-loader',
                {
                  loader: 'babel-loader',
                  options: {
                    babelrc: false,
                    configFile: false,
                    compact: false,
                    presets: [
                      [require.resolve('babel-preset-react-app/dependencies')],
                      ['@babel/preset-react'],
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    // plugins: [new HtmlWebpackPlugin()],
  };
};
