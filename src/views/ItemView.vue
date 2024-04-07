<template>
  <IndexItemCollection />
</template>

<script setup>
// import collection from "@/api/classes/collection";

import IndexItemCollection from "@/components/collection/indexItemCollection.vue";
import { useCollectionStore } from "@/store/modules/collections";
import { defineProps, onMounted } from "vue";
const collectionStore = useCollectionStore();
onMounted(() => {
  if (collectionStore.activeCollectionGroup?.length) {
    collectionStore.SET_ACTIVE_COLLECTION_ITEM(props.id);
  } else {
    console.log(`e`);
  }
});
const props = defineProps({
  collection: {
    type: String,
  },
  id: {
    type: String,
  },
});
</script>

<style scoped></style>
