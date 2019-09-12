const withCSS = require('@zeit/next-css');

const CTF_SPACE_ID = '2yyqu727iw3x';
const CTF_CDA_ACCESS_TOKEN = 'd9qtCt0_5cXHjQ5wF4dcbLvCznnY8_mqLc7kyjY04cg';

module.exports = withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
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
  publicRuntimeConfig: {
    CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN,
  },
});
