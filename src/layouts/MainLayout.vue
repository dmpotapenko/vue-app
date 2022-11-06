<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import "@/assets/global.scss";

const store = useStore();
const router = useRouter();
const isAuthorized = computed(() => store.getters.authorized);

watch(
  isAuthorized,
  (authorized) => {
    if (!authorized && router.currentRoute.value.name !== "home") {
      router.push({ name: "home" });
    }
  },
  {
    immediate: true,
  }
);

store.dispatch("initState");

function onLogoutClick() {
  store.dispatch("logout");
}
</script>

<template>
  <header class="clearfix">
    <div class="right" v-if="isAuthorized">
      <div class="btn btn_link btn-logout" @click="onLogoutClick">Logout</div>
    </div>
  </header>
  <main class="main">
    <div class="page">
      <router-view />
    </div>
  </main>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-direction: column;

  height: 100vh;

  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #0001;
  }

  .page {
    display: flex;
    margin: 0 auto;
    flex: 1;
  }

  .btn-logout {
    margin: 12px;
  }
}
</style>
