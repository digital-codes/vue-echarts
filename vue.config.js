import nested from "postcss-nested";

export default {
  outputDir: "demo",
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [nested()]
        }
      }
    }
  },
  chainWebpack: config => {
    config.entry("app").clear().add("./src/demo/main.ts");

    config.module
      .rule("svg")
      .clear()
      .test(/\.svg$/)
      .type("asset/source");

    config.module
      .rule("wasm")
      .test(/\.wasm$/)
      .type("asset/resource")
      .set("generator", {
        filename: "[name].[hash:8][ext]"
      });

    config.plugin("define").tap(([options]) => [
      {
        ...options,
        __CSP__: "false"
      }
    ]);
  },
  devServer: {
    allowedHosts: "all"
  }
};
