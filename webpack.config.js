const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: {
     app: "./public/index.js",
    },
    output: {
      path: __dirname + "./assets/icons",
      filename:  "icon-192x192.png",
      filename: "icon-512x512.png"
    },
    mode: "production",
    plugins: [
        new WebpackPwaManifest({
          
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
                size: [192 , 512],
              destination: path.join('assets', 'icons')
            
            },
          ],
        }),

    ],
};

  module.exports = config;