const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.dev'); // process.env.env === 'dev' ? '*.dev.js' : '*.prod.js';

const compiler = webpack(webpackConfig);

console.log('webpackConfig', webpackConfig)
const app = express();
const devs = devMiddleware(compiler, {
  logLevel: 'warn',
  publicPath: webpackConfig.output.publicPath
})

const hots = hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
})

app.use(devs);
app.use(hots);

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 1616, function() {
  console.log("Listening on %j");
});