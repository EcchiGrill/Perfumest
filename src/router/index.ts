import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";
import Shop from "@/views/ShopView.vue";
import NotFound from "@/views/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/shop", component: Shop },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
