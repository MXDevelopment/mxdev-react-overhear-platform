/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
  "@babel/plugin-proposal-export-namespace-from",
  /** NOTE: This must be last in the plugins @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin */
  "react-native-reanimated/plugin",
  /** react-native-dotenv for loading environment variables */
  [
    "module:react-native-dotenv",
    {
      moduleName: "@env",
      path: ".env",
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    },
  ],
];

/** @type {import('@babel/core').TransformOptions} */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins: plugins,
  };
};
