import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import SignIn from "../views/SignIn.vue";
import UserProfile from "../views/UserProfile.vue";

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
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/:catchAll(.*)",
    name: "any",
    redirect() {
      if (store.getters.authorized) {
        return { name: "user-profile", replace: true };
      }
      return { name: "signin", replace: true };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.authRequired && !store.getters.authorized) {
    next({ name: "signin" });
  } else {
    next();
  }
});

export default router;
