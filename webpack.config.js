const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: "./public/index.js",
    output: {
      path: __dirname + "/public",
      filename: "indexedDb.js"
    },
    mode: "deveopment"
  };
  module.exports = config;