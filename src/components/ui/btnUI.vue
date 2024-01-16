<script setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  color: {
    type: String,
    default() {
      return "";
    },
  },
  btnType: {
    type: String,
    default() {
      return "button";
    },
  },
  loading: {
    type: Boolean,
    default() {
      return false;
    },
  },
});
const classStyle = computed(() => ` ${classColor.value} ${classLoading.value}`);
const classColor = computed(() => `btn--${props.color}`);
const classLoading = computed(() => (props.loading ? "btn--loading" : ""));
</script>

<template>
  <button :disabled="loading" type="btnType" :class="`btn ${classStyle}`">
    <slot></slot>
    <img
      v-if="loading"
      class="loading-svg"
      src="../../assets/svg/loading.svg"
      alt=""
    />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  height: 32px;
  font-size: 16px;
  padding: 0px 10px;
  border-radius: 4px;
  border: none;
  outline: 1px solid $black;
  background-color: $white;
  cursor: pointer;
  position: relative;
  & .loading-svg {
    width: 25px;
    top: 3px;
    right: 5px;
    position: absolute;
  }
  &--loading {
    padding-right: 40px;
    filter: grayscale(50%);
  }
  &--green {
    background-color: $green;
    outline-color: $green;
    color: $white;
  }
  &--blue {
    background-color: $blue;
    outline-color: $blue;
    color: $white;
  }
  &--red {
    background-color: $red;
    outline-color: $red;
    color: $white;
  }
}
</style>
