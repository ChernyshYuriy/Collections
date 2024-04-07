<template>
  <h2>{{ item.name }}</h2>

  <div>rating</div>
  <div>link btn</div>
  <div>description</div>
  <br />
  <div>review rating</div>
  <div>count + and -</div>
  <div>review</div>
</template>

<script setup>
import { useCollectionStore } from "@/store/modules/collections";
import { defineProps } from "vue";
const collectionStore = useCollectionStore();
const item = collectionStore.activeCollectionItem;
defineProps({
  id: String,
});
</script>

<style lang="scss" scoped></style>
