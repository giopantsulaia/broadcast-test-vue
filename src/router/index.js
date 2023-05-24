import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import MainPage from "../pages/MainPage.vue";
import { isLoggedIn } from "./guards";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/",
      name: "home",
      component: MainPage,
      beforeEnter: [isLoggedIn],
    },
  ],
});

export default router;
