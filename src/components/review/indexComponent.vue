<script setup>
import itemReview from "./itemReview.vue";
</script>
<template>
  <div class="review">
    <div class="review__list list">
      <itemReview class="list__item" :item="item" />
      <itemReview class="list__item" :item="item" />

      <itemReview class="list__item" :item="item" />

      <itemReview class="list__item" :item="item" />

      <itemReview class="list__item" :item="item" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
