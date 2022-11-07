<script setup lang="ts">
import Profile from "@/views/UserProfile.vue";
</script>

<template>
  <div id="user-profile">
    <Suspense>
      <Profile />
      <template #fallback>
        <div class="loader">
          <v-loader :is-loading="true"></v-loader>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

#user-profile {
  display: flex;
  padding: toRem($size-12) 0;
  min-height: 200px;
}

.loader {
  display: flex;
  justify-content: center;
  flex: 1;
}
</style>
