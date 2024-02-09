<template>
  <div class="review-item">
    <dropElement class="drop-element" :is-open-status="showDropContent">
      <template #main>
        <div class="review-item-main">
          <span>TITLE</span>
          <span class="review-item-main__rating-10">8</span>
          <span class="review-item-main__rating-100">78</span>
        </div>
      </template>
      <template #content></template>
    </dropElement>
  </div>
</template>

<script setup>
import dropElement from "../ui/dropElement.vue";
import { ref } from "vue";
const showDropContent = ref(false);
</script>

<style lang="scss" scoped>
.review-item {
  & &-main {
    height: 20px;
    padding: 6px 5px;
    margin-bottom: 6px;
    font-size: 20px;
    border-bottom: 1px solid $gray;
    display: grid;
    grid-template-columns: 1fr 26px 38px;
    align-items: center;
    &__rating-10 {
      display: flex;
      justify-content: center;
      //   background-color: $grayLight2;
    }
    &__rating-100 {
      display: flex;
      justify-content: center;
      //   background-color: $grayLight3;
    }
  }
}
</style>
