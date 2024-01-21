<script setup>
import { defineProps } from "vue";
const props = defineProps({
  item: {
    type: Object,
  },
});
</script>
<template lang="">
  <div class="collection-item">{{ props.item.name }}</div>
</template>
<style lang="scss">
.collection-item {
  padding: 10px;
  &::first-letter {
    text-transform: capitalize;
  }
  &:nth-child(2n + 1) {
    background-color: #f3f3f3;

    /* Your styles here */
  }
}
</style>
