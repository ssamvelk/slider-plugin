const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    'css-loader',
    {
      loader: "postcss-loader",
      options:{ sourceMap: true, config: {path: 'postcss.config.js'} }
    }
  ]
  
  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    app: ['@babel/polyfill', './js/index.ts'],
    plugin: ['@babel/polyfill', './js/slider-plugin.ts']
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  optimization: optimization(),
    
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders()
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-typescript')
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        use:[
          {loader: 'html-loader',},
          {loader: 'pug-html-loader', options: { data: {} }}
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader:'file-loader',
            options: {
              name: 'img/[name].[ext]',
              exclude: ['src/fonts/'],
            },
          },
          {   
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          }
        }]
      }
    ]
  },

  devServer: {
    overlay: true,
    hot: isDev
  },

  devtool: isDev ? 'source-map' : '',
    
  watch: true,
    
  plugins: [
    new HtmlWebpackPlugin({
      template: "pug/index.pug",
      filename:  'index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    
    new CleanWebpackPlugin(),
    
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets/favicon/',
          to: path.resolve(__dirname, 'dist/assets/favicon')
        },
        {
          from: 'assets/MVP.jpg',
          to: path.resolve(__dirname, 'dist/assets/img')
        },
      ],
    }),
    
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    })
  ]
};