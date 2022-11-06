import { createApp } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import VLoader from "@/components/VLoader.vue";
import router from "@/router";
import store from "@/store";
import { worker } from "@/mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const app = createApp(MainLayout);
app.component("v-loader", VLoader);
app.use(store).use(router).mount("#app");
export { app };
