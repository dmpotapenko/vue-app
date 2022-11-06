import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomePage from "../views/HomePage.vue";
import UserProfile from "../views/UserProfileSuspense.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/profile",
    name: "user-profile",
    component: UserProfile,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
    beforeEnter: (_, __, next) => {
      if (store.getters.authorized) {
        return next({ name: "user-profile" });
      }
      return next();
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "any",
    redirect() {
      if (store.getters.authorized) {
        return { name: "user-profile", replace: true };
      }
      return { name: "home", replace: true };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.authRequired && !store.getters.authorized) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
