const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 3001,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
}
