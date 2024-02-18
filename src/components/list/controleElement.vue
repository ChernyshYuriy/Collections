<script setup>
import { useCollectionStore } from "@/store/modules/collections";
import CollectionItem from "@/components/list/item/indexItem.vue";
const collectionsStore = useCollectionStore();
</script>
<template>
  <div>
    <CollectionItem
      :item="item"
      v-for="item in collectionsStore.collectionsList"
      :key="item.objectId"
      :isControlPanel="true"
    />
  </div>
</template>

<style lang="scss" scoped></style>
