const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Или 'production' для продакшн сборки
  entry: './src/index.js', // Точка входа вашего приложения
  output: {
    filename: 'bundle.js', // Название выходного файла
    path: path.resolve(__dirname, 'dist'), // Путь к директории с выходными файлами
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Используйте этот загрузчик для продакшн сборки
          // 'style-loader', // Или этот для разработки (вставляет стили в DOM)
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html', // Путь к вашему шаблону HTML
        filename: 'index.html' // Имя выходного файла в dist/
      })
  ],
};
