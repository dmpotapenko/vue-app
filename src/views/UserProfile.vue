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
  if (authUserId.value) {
    await store.dispatch("fetchUserProfile", authUserId.value);
  }
}
</script>

<template>
  <div v-if="profileData" class="profile">
    <div class="profile__header">
      <div class="profile__image">
        <img :src="profileData.avatarUrl" alt="must be here" />
      </div>
      <div class="profile__info">
        <h3>{{ profileData.name }}</h3>
        <p>{{ profileData.email }}</p>
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
@import "@/assets/variables.scss";
.summary {
  display: grid;
  grid-template-columns: repeat(2, min-content);
  grid-auto-rows: auto;
  gap: toRem($size-8);

  @include media(md) {
    grid-template-columns: min-content auto;
    font-size: 1.2rem;
  }

  & > span {
    padding: toRem($size-4);
    background-color: #eee8;
  }
}
h4 {
  margin: toRem($size-4) 0;
  font-size: toRem($size-20);
}
.profile {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  height: max-content;
  border-radius: $size-8;

  &__header {
    background-color: white;
    padding: toRem($size-12);
    display: flex;
    column-gap: toRem($size-16);

    @include media(sm) {
      flex-wrap: wrap;
    }
  }

  &__content {
    padding: toRem($size-12);
    background-color: $white;
  }

  &__image {
    flex: 1 1 auto;
    width: 10%;
    overflow: hidden;
    display: flex;
    align-items: center;
    min-height: toRem(112px);

    @include media(md) {
      width: 25%;
    }
    @include media(sm) {
      float: none;
      max-width: 40%;
      margin: 0 auto;
    }

    & > img {
      width: 100%;
      height: auto;
      display: block;
      padding: $size-4;
      border-radius: 50%;
      background-color: $dark;
    }

    & > .profile__name {
      font-size: 1.2em;
      font-weight: 600;

      display: block;
      text-align: center;
      margin-top: toRem($size-8);
    }
  }
  &__info {
    flex: 1 1 auto;
    width: calc(80% - toRem($size-16));
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3,
    p {
      margin: 0;
    }

    @include media(md) {
      width: 75%;
    }
    @include media(sm) {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
