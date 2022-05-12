/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withAntdLess = require("next-plugin-antd-less");

module.exports = withBundleAnalyzer(
  withAntdLess({
    // Or better still you can specify a path to a file
    lessVarsFilePath: "./styles/variables.less",
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...

    webpack(config) {
      return config;
    },

    // ONLY for Next.js 10, if you use Next.js 11, delete this block
    future: {
      webpack5: true,
    },
    reactStrictMode: true,
  })
);
