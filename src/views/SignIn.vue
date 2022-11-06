<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const email = reactive({
  value: "",
  invalid: false,
});
const password = reactive({
  value: "",
  invalid: false,
});
const isLoading = ref(false);

watch(
  () => store.getters.authorized,
  (value) => {
    if (value) {
      router.push({ name: "user-profile" });
    }
  }
);

async function signInUser() {
  isLoading.value = true;
  await store.dispatch("signin", {
    email: email.value,
    password: password.value,
  });
  isLoading.value = false;

  if (store.getters.authorized) {
    router.push({ name: "user-profile" });
  }
}

function onSubmit(event: Event) {
  event.preventDefault();

  if (validateFields()) {
    signInUser();
  }
}
function validateFields() {
  let invalid = false;
  invalid = invalid || (email.invalid = !email.value);
  invalid = invalid || (password.invalid = !password.value);
  return !invalid;
}
</script>

<template>
  <div id="signin">
    <v-loader :is-loading="isLoading">
      <div class="content">
        <h1>Sign In</h1>
        <form class="form" @submit="onSubmit">
          <div
            class="form__field"
            :class="email.invalid ? 'form_invalid' : null"
          >
            <label for="email" class="form__label">Email</label>
            <input
              id="email"
              class="form__input"
              name="email"
              type="text"
              v-model="email.value"
              placeholder="email@example.com"
              tabindex="1"
            />
            <div class="form__error"><b>email</b> should not be empty</div>
          </div>
          <div
            class="form__field"
            :class="password.invalid ? 'form_invalid' : null"
          >
            <label for="password" class="form__label">Password</label>
            <input
              id="password"
              class="form__input"
              name="password"
              type="password"
              v-model="password.value"
              placeholder="*****"
              tabindex="2"
            />
            <div class="form__error"><b>password</b> should not be empty</div>
          </div>
          <button class="btn btn_primary" type="submit" tabindex="3">
            Sign In
          </button>
        </form>
      </div>
    </v-loader>
  </div>
</template>

<style lang="scss">
#signin {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: #555;
  }

  .content {
    padding: 2em;
    width: 100%;
    background-color: white;
    border-radius: 0.5em;
    min-width: 480px;
  }
}
</style>
