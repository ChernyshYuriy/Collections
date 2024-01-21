<script setup>
// import { ref } from "vue";

import { useCollectionStore } from "@/store/modules/collections";
import { useSearchStore } from "@/store/modules/search";

import addElement from "@/components/collection/addElement.vue";
import CollectionItem from "@/components/collection/collectionItem.vue";
const searchStore = useSearchStore();

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
    <template v-if="searchStore.searchResults?.length">
      <div v-for="item in searchStore.searchResults" :key="item.id">
        <h3>{{ item.originalTitleText.text }}</h3>
        <img
          v-if="item.primaryImage"
          :src="item.primaryImage.url"
          alt=""
          width="200"
        />
      </div>
    </template>
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
