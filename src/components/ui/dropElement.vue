<script setup>
import { defineProps, ref, computed } from "vue";

const props = defineProps({
  isOpenStatus: {
    type: Boolean,
  },
  isContentAbsolutePosition: {
    type: Boolean,
    default: false,
  },
});
const main = ref(null);
const mainH = computed(() => main.value?.offsetHeight + "px");
</script>
<template>
  <div class="drop-container">
    <div class="drop-container__main" ref="main">
      <slot name="main"></slot>
    </div>
    <div
      class="drop-container__content"
      :class="{
        'drop-container__content--open': props.isOpenStatus,
        'drop-container__content--over': props.isContentAbsolutePosition,
      }"
    >
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.drop-container {
  position: relative;
  &__content {
    display: grid;
    transition: grid-template-rows 0.3s ease-in-out;
    grid-template-rows: 0fr;
    background-color: $white;
    &--open {
      grid-template-rows: 1fr;
    }
    &--over {
      position: absolute;
      z-index: 1;
      top: v-bind("mainH");
      left: 0px;
      background-color: $white;
      width: 100%;
      box-shadow: 0px 4px 4px $gray;
    }
    & .content {
      overflow: hidden;
    }
  }
}
</style>
