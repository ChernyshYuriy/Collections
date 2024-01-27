<script setup>
import { useCollectionStore } from "@/store/modules/collections";
import CollectionItem from "@/components/collection/collectionItem.vue";
const collectionsStore = useCollectionStore();
</script>
<template>
  <div>
    <CollectionItem
      :item="item"
      v-for="item in collectionsStore.collectionsList"
      :key="item.objectId"
      :isFullCollection="true"
    />
  </div>
</template>

<style lang="scss" scoped></style>
