// craco.config.js
// import path from "path";

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallback for 'stream' and 'crypto' modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
      };

      return webpackConfig;
    },
    style: {
      postcss: {
        pligins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  },
};
