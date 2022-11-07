<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
withDefaults(
  defineProps<{
    isLoading: boolean;
  }>(),
  { isLoading: false }
);
</script>

<template>
  <div class="loader-container">
    <slot />
    <slot name="loader" v-if="isLoading">
      <div class="loader">
        <div class="loader__backdrop"></div>
        <div class="loader__spinner">
          <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scopped lang="scss">
@import "@/assets/variables";

.loader-container {
  position: relative;
}

.loader {
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &__backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: change-color($color: $dark-light, $alpha: 0.2);
    filter: blur($size-8);
  }
  &__spinner {
    .lds-facebook {
      display: inline-block;
      position: relative;
      width: $size-80;
      height: $size-80;
    }
    .lds-facebook div {
      display: inline-block;
      position: absolute;
      left: $size-8;
      width: $size-16;
      background: $primary;
      box-shadow: 0 0 $size-4 $primary;
      animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-facebook div:nth-child(1) {
      left: $size-8;
      animation-delay: -0.24s;
    }
    .lds-facebook div:nth-child(2) {
      left: $size-32;
      animation-delay: -0.12s;
    }
    .lds-facebook div:nth-child(3) {
      left: $size-56;
      animation-delay: 0;
    }
    @keyframes lds-facebook {
      0% {
        top: $size-8;
        height: $size-64;
      }
      50%,
      100% {
        top: $size-24;
        height: $size-32;
      }
    }
  }
}
</style>
