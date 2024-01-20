<script setup>
// import { ref } from "vue";

import { useCollectionStore } from "@/store/modules/collections";
import addElement from "@/components/collection/addElement.vue";
import CollectionItem from "@/components/collection/collectionItem.vue";

const store = useCollectionStore();
</script>
<template>
  <div class="collection">
    <div class="collection__navigation nav">
      <div
        class="nav__item"
        :class="{
          'nav__item--active': item.objectId === store.activeCollectionId,
        }"
        v-for="item in store.collectionsList"
        :key="item.objectId"
        @click="store.CHANGE_ACTIVE_COLLECTION(item.objectId)"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <CollectionItem
        :item="item"
        v-for="item in store.activeCollectionGroup"
        :key="item.id"
      />

      <addElement />
    </div>
  </div>
</template>
<style lang="scss">
.collection {
  margin-top: 20px;
  &__navigation {
    display: flex;
    justify-content: center;
    background-color: $green;
    margin-bottom: 10px;
  }
}
.nav {
  &__item {
    background-color: $green;
    padding: 12px 20px;
    color: $white;
    outline: 1px solid $white;
    cursor: pointer;
    &--active {
      background-color: $white;
      color: $black;
      border: 1px solid $green;
      outline: none;
    }
  }
}
</style>
