import { createApp } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import router from "@/router";
import store from "@/store";

import VLoader from "@/components/VLoader.vue";

const app = createApp(MainLayout);
app.component("v-loader", VLoader);
app.use(store).use(router).mount("#app");
export { app };
