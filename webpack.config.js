const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: {
     app: "./public/index.js",
      db: "./public/indexedDb.js"
    },
    output: {
      path: __dirname + "public/assets/icons",
      filename:  "icon-192x192.png",
      filename: "icon-512x512.png"
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
              public: path.resolve(
                    __dirname,
                    "public/assets/icons",
                    ),
                size: [192, 512],
              destination: path.join('assets', 'icons'),
            
            },
          ],
        }),

    ],
};

  module.exports = config;