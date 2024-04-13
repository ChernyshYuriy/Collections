<script setup>
import { defineProps, defineEmits } from "vue";
import { createDebounce } from "@/utils/global";

defineProps({
  modelValue: {
    type: Number,
  },
  title: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["setRating", "update:modelValue"]);

const debounce = createDebounce();
function changeRating(newValue) {
  if (isNaN(Number(newValue))) return;
  emit("update:modelValue", newValue);
}
</script>
<template>
  <div class="title" v-if="title">{{ title }}</div>
  <div class="rating">
    <button
      type="button"
      class="rating__btn"
      @click="debounce(() => changeRating(modelValue + 1))"
    >
      &#10133;
    </button>
    <input
      class="rating__input"
      type="number"
      :value="modelValue"
      @change="changeRating(Number($event.target.value))"
    />
    <button
      type="button"
      class="rating__btn"
      @click="debounce(() => changeRating(modelValue - 1))"
    >
      &#10134;
    </button>
  </div>
</template>
<style lang="scss" scoped>
.title {
  text-align: center;
  margin: 5px 0px;
}
.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  &__btn {
    cursor: pointer;
    height: 26px;
    width: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
  }
  &__input {
    border-radius: 8px;
    border: none;
    outline: 1px solid #000;
    padding: 2px 3px;
    font-size: 18px;
    width: 64px;
    text-align: center;
  }
}
</style>
