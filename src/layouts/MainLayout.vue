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
    flex: 1;

    display: flex;
    flex-direction: column;

    background-color: #0001;
  }

  .page {
    margin: 0 auto;

    flex: 1;
    display: flex;
  }

  .form {
    &__field {
      margin-bottom: 1em;

      & > .form__label {
        display: block;
        font-size: 1.2em;
        font-weight: 600;
        color: #444d;
        margin-bottom: 0.1em;
      }

      & > .form__input {
        display: block;
        width: 100%;
        outline: 0;
        border: 2px solid #555;
        color: #555;
        line-height: 1.2;
        font-size: 1.125em;
        box-sizing: border-box;
        background: 0 0;
        height: 2.5em;
        padding: 0 0.5em;
        transition: 0.3s linear;

        &:focus {
          border-color: #3abf7d;
          border-width: 2px;
          transition: 0.3s linear;
        }
        &:hover {
          border-color: #86baa3;
          border-width: 2px;
          transition: 0.3s linear;
        }
      }

      & > .form__error {
        display: none;
        padding: 4px 2px 2px 6px;
      }
    }

    &_invalid {
      & > .form__input {
        border-color: red;
      }
      & > .form__error {
        display: block;
        color: red;
      }
    }
  }

  .btn {
    cursor: pointer;
    padding: 0.75em;
    border: 1px solid #444;

    color: white;
    background-color: #444;
    font-size: 1.15em;
  }

  .btn_link {
    background-color: white;
    color: black;
    border: none;
    padding: 0;

    &:hover {
      color: purple;
      text-decoration: underline;
    }
    &:active {
      color: blue;
    }
  }

  .btn_primary {
    background-color: #3abf7d;

    &:hover {
      background-color: lighten(#3abf7d, 5);
    }
    &:active {
      box-shadow: inset 0px 0px 6px #2229;
    }
  }

  .right {
    float: right;
  }

  .clearfix::after {
    content: " ";
    display: table;
    clear: both;
  }

  .btn-logout {
    margin: 12px;
  }

  .text-danger {
    color: red;
  }
}
</style>
