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
    background-color: #444a;
    filter: blur(4px);
  }
  &__spinner {
    .lds-facebook {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-facebook div {
      display: inline-block;
      position: absolute;
      left: 8px;
      width: 16px;
      background: #3abf7d;
      box-shadow: 0 0 4px #3abf7d;
      animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-facebook div:nth-child(1) {
      left: 8px;
      animation-delay: -0.24s;
    }
    .lds-facebook div:nth-child(2) {
      left: 32px;
      animation-delay: -0.12s;
    }
    .lds-facebook div:nth-child(3) {
      left: 56px;
      animation-delay: 0;
    }
    @keyframes lds-facebook {
      0% {
        top: 8px;
        height: 64px;
      }
      50%,
      100% {
        top: 24px;
        height: 32px;
      }
    }
  }
}
</style>
