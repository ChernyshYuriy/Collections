<template>
  <div class="item-page">
    <div class="item-page__top">
      <div>
        <h2>{{ item.name }}</h2>

        <div>Rating: {{ item.rating }}</div>
        <div>link btn</div>
        <btnUI v-if="item.link" color="blue" :loading="loadingUser">
          {{ item.link }}
        </btnUI>
      </div>
      <img src="../../assets/title512.png" width="200px" alt="" />
    </div>

    <div class="item-page__review">
      <textBlock>
        <template #header> description </template>
        <template #body> description </template>
      </textBlock>
      <br />
      <div>review rating</div>
      <div>count + and -</div>
      <textBlock>
        <template #header> review </template>
        <template #body> review </template>
      </textBlock>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { useCollectionStore } from "@/store/modules/collections";
import btnUI from "../ui/btnUI.vue";
import textBlock from "../ui/textBlock.vue";
import { defineProps } from "vue";
const collectionStore = useCollectionStore();
const item = collectionStore.activeCollectionItem;
defineProps({
  id: String,
});
</script>

<style lang="scss" scoped>
.item-page {
  &__top {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  &__review {
    margin-top: 30px;
  }
}
</style>
