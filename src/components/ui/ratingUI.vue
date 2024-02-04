<script setup>
import { defineProps, defineEmits } from "vue";
import { createDebounce } from "@/utils/global";

defineProps({
  modelValue: {
    type: Number,
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
  <div class="rating">
    <span
      class="rating__btn"
      @click="debounce(() => changeRating(modelValue + 1))"
      >&#10133;</span
    >
    <input
      class="rating__input"
      type="number"
      :value="modelValue"
      @change="changeRating(Number($event.target.value))"
    />
    <span
      class="rating__btn"
      @click="debounce(() => changeRating(modelValue - 1))"
      >&#10134;</span
    >
  </div>
</template>
<style lang="scss" scoped>
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
