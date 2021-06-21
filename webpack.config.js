const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: "./public/index.js",
    output: {
      path: __dirname + "/public",
      filename: "indexedDb.js",
    },
    mode: "production",
    plugins: [
        new WebpackPwaManifest({
          // the name of the generated manifest file
          filename: "manifest.json",
          inject: false,
          fingerprints: false,

          name: "Budget Tracker",
          short_name: "Budget Tracker",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          start_url: "/",
          display: "standalone",
      

          icons: [
            {
              src: path.resolve(
                    __dirname,
                    "public/assets/icons",
                    ),
                size: [192, 612]
            
            }
          ]
        })

    ]
};

  module.exports = config;