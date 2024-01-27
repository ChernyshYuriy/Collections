<script setup>
import { reactive, ref, watch } from "vue";
import { useCollectionStore } from "@/store/modules/collections";
import { useSearchStore } from "@/store/modules/search";

import addElement from "@/components/collection/addElement.vue";
import CollectionItem from "@/components/collection/collectionItem.vue";
import ControlElement from "./controleElement.vue";

const costumeNavigation = reactive({
  name: "Control",
  id: "deleted-navigation",
});
const searchStore = useSearchStore();
const store = useCollectionStore();
const navItemCollectionRef = ref(null);
const navItemControlRef = ref(null);
const sumNavigationWidth = ref(0);
const screenWidth = ref(window.innerWidth);
watch(
  () => navItemCollectionRef.value,
  (newCollection) => {
    if (!newCollection || newCollection.length === 0) return;

    sumNavigationWidth.value = newCollection.reduce(
      (accumulatorWidth, elementDOM) =>
        elementDOM.offsetWidth + accumulatorWidth,
      0
    );
    sumNavigationWidth.value += navItemControlRef.value.offsetWidth;
  }
);
</script>
<template>
  <div class="collection">
    <div
      class="collection__navigation nav"
      :class="{ 'nav--scroll': sumNavigationWidth > screenWidth }"
    >
      <div
        class="nav__item"
        :class="{
          'nav__item--active': item.objectId === store.activeCollectionId,
        }"
        ref="navItemCollectionRef"
        v-for="item in store.collectionsList"
        :key="item.objectId"
        @click="store.CHANGE_ACTIVE_COLLECTION(item.objectId)"
      >
        {{ item.name }}
      </div>
      <div
        class="nav__item"
        :class="{
          'nav__item--active':
            costumeNavigation.id === store.activeCollectionId,
        }"
        ref="navItemControlRef"
        @click="store.CHANGE_ACTIVE_COLLECTION(costumeNavigation.id)"
      >
        {{ costumeNavigation.name }}
      </div>
    </div>
    <template v-if="store.activeCollectionGroup">
      <CollectionItem
        :item="item"
        v-for="item in store.activeCollectionGroup"
        :key="item.id"
      />
    </template>

    <addElement v-if="store.activeCollectionId !== costumeNavigation.id" />
    <template v-else> <ControlElement /> </template>

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
    background-color: $green;
    margin-bottom: 10px;
    justify-content: center;
  }
}
.nav {
  &--scroll {
    overflow: scroll;
    justify-content: flex-start;
  }
  &__item {
    background-color: $green;
    padding: 12px 20px 16px;
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
