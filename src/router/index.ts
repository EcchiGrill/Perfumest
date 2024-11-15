import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";
import Shop from "@/views/ShopView.vue";
import Login from "@/views/LoginView.vue";
import Profile from "@/views/ProfileView.vue";
import Register from "@/views/RegisterView.vue";
import Contact from "@/views/ContactView.vue";
import Checkout from "@/views/CheckoutView.vue";
import NotFound from "@/views/NotFound.vue";
import Terms from "@/views/TermsView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useModalRouter } from "jenesius-vue-modal";

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "login",
        component: useModalRouter(Login),
      },
      {
        path: "register",
        component: useModalRouter(Register),
      },
    ],
  },
  { path: "/about", component: About },
  {
    path: "/profile",
    component: Profile,
  },
  { path: "/shop", component: Shop },
  { path: "/contact", component: Contact },
  { path: "/checkout", component: Checkout },
  { path: "/terms", component: Terms },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

useModalRouter.init(router);

export default router;
