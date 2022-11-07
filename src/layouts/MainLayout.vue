<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

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
@import "@/assets/global.scss";

body {
  @include media(lg) {
    font-size: $size-20;
  }
  @include media(sm) {
    font-size: $size-24;
  }
}

html,
body {
  margin: 0;
  background: linear-gradient(20deg, $dark, $dark-light, $dark);
}

#app {
  color: #2c3e50;
  padding: $size-12 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;

  max-width: 760px;
  @include media(md) {
    width: 80%;
  }
  @include media(sm) {
    width: 96%;
    max-width: 100%;
  }

  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .page {
    display: flex;
    flex: 1;
  }

  .btn-logout {
    font-size: toRem($size-20);
    margin: 0.5em;
  }

  header {
    left: 0;
    border-radius: $size-8;
    background-color: $white;
    box-shadow: 0 0 $size-4 $dark;
  }
}
</style>
