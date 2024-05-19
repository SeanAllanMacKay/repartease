module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
          root: ["./"],
          alias: {
            "Contexts/": "./Contexts/",
            "Components/": "./Components/",
            "BIC/": "./BIC/",
            "Api/": "./Api/",
          },
        },
      ],
    ],
  };
};
