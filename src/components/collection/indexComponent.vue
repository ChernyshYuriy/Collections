<script setup>
import { ref } from "vue";
import { useCollectionStore } from "@/store/modules/collections";
// import { useSearchStore } from "@/store/modules/search";
import { navControlId } from "@/static/nav";

import addElement from "@/components/collection/addElement.vue";
import CollectionItem from "@/components/collection/collectionItem.vue";
import ControlElement from "./controleElement.vue";
import dropElement from "../ui/dropElement.vue";
import btnUI from "../ui/btnUI.vue";
import collectionsNav from "./collectionsNav.vue";

// const searchStore = useSearchStore();
const store = useCollectionStore();

const showAddElement = ref(false);
</script>
<template>
  <div class="collection">
    <collectionsNav
      v-if="store.collectionsList.length"
      class="collection__navigation"
      :collectionsList="store.collectionsList"
      :activeCollectionId="store.activeCollectionId"
      @changeCollection="store.CHANGE_ACTIVE_COLLECTION($event)"
    />
    <div class="collection__items" v-if="store.activeCollectionGroup">
      <CollectionItem
        :title="item.name"
        :item="item"
        v-for="item in store.activeCollectionGroup"
        :key="item.id"
      />
    </div>
    <div
      v-if="store.activeCollectionId !== navControlId"
      class="collection__add-element"
    >
      <dropElement :is-open-status="showAddElement"
        ><template #main
          ><btnUI
            class="elem-center"
            color="green"
            @click="showAddElement = !showAddElement"
            >{{ showAddElement ? "Hide" : "Show" }} add element modal
          </btnUI></template
        >
        <template #content> <addElement /> </template
      ></dropElement>
    </div>
    <template v-else> <ControlElement /> </template>

    <!-- <template v-if="searchStore.searchResults?.length">
      <div v-for="item in searchStore.searchResults" :key="item.id">
        <h3>{{ item.originalTitleText.text }}</h3>
        <img
          v-if="item.primaryImage"
          :src="item.primaryImage.url"
          alt=""
          width="200"
        />
      </div>
    </template> -->
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
  &__items {
    margin-bottom: 62px;
  }
  &__add-element {
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background-color: $whiteTransparent;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 10px;
  }
}
</style>
