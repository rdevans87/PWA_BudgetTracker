const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: "./public/index.js",
    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },
    mode: "production"
  };
  module.exports = config;