import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App).use(pinia).use(router);

app.mount("#app");
