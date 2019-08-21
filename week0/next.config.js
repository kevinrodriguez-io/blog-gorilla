const withCSS = require('@zeit/next-css');

// TODO: add contentful keys

module.exports = withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    /**
     * This rule is used for css files that include any kind
     * of font or other references. It does put the given file
     * on the static folder at compile time.
     */
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
  // TODO: add publicRuntimeConfig
});
