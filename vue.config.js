const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    i18n: {
      locale: "en-US",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
});
