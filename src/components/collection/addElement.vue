<script setup>
import { ref } from "vue";
import btnUI from "../ui/btnUI.vue";
import inputUI from "../ui/inputUI.vue";
import { useCollectionStore } from "@/store/modules/collections";
// import { useSearchStore } from "@/store/modules/search";
import { createNewCollectionItem } from "@/utils/collections";
import RatingUI from "../ui/ratingUI.vue";

const validationMessage = {
  alreadyCreated: "this item already created",
};
const store = useCollectionStore();
// const searchStore = useSearchStore();
const name = ref("");
const validation = ref("");
const rating = ref(0);
const isAlreadyCreated = () =>
  store.activeCollectionGroup.some((item) => item.name === name.value.trim());
const addElement = () => {
  if (!name?.value?.trim()) return;
  if (isAlreadyCreated()) {
    validation.value = validationMessage.alreadyCreated;
    return;
  }
  validation.value = "";
  const newItem = createNewCollectionItem(name.value.trim(), rating.value);
  store.ADD_ELEMENT_TO_COLLECTION(store.activeCollectionIndex, newItem);
  store.saveChangesToCollection(store.activeCollectionId);
  name.value = "";
  rating.value = 0;
};
</script>

<template>
  <form class="form" @submit.prevent="addElement()">
    <inputUI
      v-model="name"
      id="item"
      :title="`${store.activeCollectionTitle} new element name`"
      :validation="validation"
    />
    <RatingUI class="form__rating" v-model="rating" />
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
}
</style>
