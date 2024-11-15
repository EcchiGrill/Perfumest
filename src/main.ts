import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import router from "./router";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App).use(router).use(pinia).use(Toast);

app.mount("#app");
