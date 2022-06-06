import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import VueLazyload from "vue-lazyload";

createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(VueLazyload, {
    loading: require("./assets/placeholder.webp")
  })
  .mount("#app");
