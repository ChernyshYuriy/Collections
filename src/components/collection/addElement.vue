<script setup>
import { ref } from "vue";
import btnUI from "../ui/btnUI.vue";
import inputUI from "../ui/inputUI.vue";
import { useCollectionStore } from "@/store/modules/collections";
// import { useSearchStore } from "@/store/modules/search";
import {
  createNewCollectionItem,
  searchSimilarInCollection,
} from "@/utils/collections";
import RatingUI from "../ui/ratingUI.vue";
import { createDebounce } from "@/utils/global";

const validationMessage = {
  alreadyCreated: "this item already created",
};
const store = useCollectionStore();
// const searchStore = useSearchStore();
const name = ref("");
const link = ref("");
const rating = ref(0);

const validation = ref("");
const isAlreadyCreated = () =>
  store.activeCollectionGroup.some((item) => item.name === name.value.trim());
const addElement = () => {
  if (!name?.value?.trim()) return;
  if (isAlreadyCreated()) {
    validation.value = validationMessage.alreadyCreated;
    return;
  }
  validation.value = "";
  const newItem = createNewCollectionItem(
    name.value.trim(),
    rating.value,
    link.value
  );
  store.ADD_ELEMENT_TO_COLLECTION(store.activeCollectionIndex, newItem);
  store.saveChangesToCollection(store.activeCollectionId);
  name.value = "";
  rating.value = 0;
};
const similarItems = ref([]);
const debounce = createDebounce(300);
function searchSimilarItems(e) {
  const value = e.target.value;
  if (value?.length <= 2) {
    similarItems.value = [];
  } else {
    similarItems.value = searchSimilarInCollection(
      store.activeCollectionGroup,
      value
    );
  }
}
</script>

<template>
  <form class="form" @submit.prevent="addElement()">
    <inputUI
      v-model="name"
      id="item"
      :title="`${store.activeCollectionTitle} new element name`"
      :validation="validation"
      @input="debounce(() => searchSimilarItems($event))"
    />

    <div class="form__similar similar" v-if="similarItems.length">
      <span>Similar in collection</span>
      <span class="similar__item" v-for="item in similarItems" :key="item">{{
        item
      }}</span>
    </div>
    <RatingUI class="form__rating" v-model="rating" />
    <inputUI
      v-model="link"
      id="item"
      :title="`${store.activeCollectionTitle} add link (optional)`"
      :validation="validation"
    />
    <btnUI type="submit" color="green"
      >Add {{ store.activeCollectionTitle }}</btnUI
    >
    <!-- <button @click="searchStore.searchGamesTitle('wit')">213</button> -->
  </form>
</template>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 260px;
  margin: 10px auto 0px;
  padding: 0px 10px 20px;
  &__rating {
    margin-bottom: 20px;
  }
  &__similar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 10px;
    & .similar__item {
      outline: 1px solid #000301;
      border-radius: 5px;
      padding: 2px;
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
}
</style>
