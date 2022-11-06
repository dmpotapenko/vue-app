<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const profileData = computed(() => store.state.profile);
const authUserId = computed(() => store.state.auth?.id);
await fetchUserProfile();
watch(authUserId, async () => {
  if (authUserId.value) {
    await fetchUserProfile();
  } else {
    router.push("home");
  }
});

async function fetchUserProfile() {
  await store.dispatch("fetchUserProfile", authUserId.value);
}
</script>

<template>
  <div v-if="profileData" class="profile">
    <div class="profile__header">
      <div class="profile__image">
        <img src="https://i.pravatar.cc/300" alt="must be here" />
      </div>
      <div class="profile__info">
        <span>{{ profileData.name }}</span>
        <h3>{{ profileData.email }}</h3>
        <p>{{ profileData.geo }}</p>
      </div>
    </div>
    <div class="profile__content">
      <h4>Summary</h4>
      <div class="summary">
        <template v-for="(value, key) in profileData" :key="key">
          <span>{{ key }}</span>
          <span>{{ value }}</span>
        </template>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ratione
        laboriosam, dolorum laborum molestias modi eveniet ullam, tenetur et
        tempora veniam perferendis nihil. Hic voluptatum quisquam delectus,
        tempora velit cumque.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summary {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-rows: auto;
  gap: 6px;

  & > span {
    padding: 2px;
    background-color: #eee8;
  }
}
h4 {
  margin: 4px 0;
  font-size: 18px;
}
.profile {
  width: 100%;
  min-height: 200px;
  max-width: 780px;
  box-sizing: border-box;
  overflow: hidden;

  &__header {
    background-color: white;
    padding: 12px;

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }

  &__content {
    padding: 12px;
    background-color: white;
  }

  &__image {
    float: left;
    width: 12%;
    padding: 4px;
    background-color: #444;
    border-radius: 4px;
    // box-shadow: 0 0 8px #444;

    & > img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
  &__info {
    float: right;
    width: 85%;
  }
}
</style>
