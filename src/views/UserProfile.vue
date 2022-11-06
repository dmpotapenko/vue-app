<script setup lang="ts">
import Profile from "@/components/User/UserProfile.vue";
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
#user-profile {
  display: flex;
  padding: 12px 0;
}

.loader {
  display: flex;
  justify-content: center;
  flex: 1;
}
</style>
