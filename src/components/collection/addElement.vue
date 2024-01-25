<script setup>
import { ref } from "vue";
import btnUI from "../ui/btnUI.vue";
import inputUI from "../ui/inputUI.vue";
import { useCollectionStore } from "@/store/modules/collections";
// import { useSearchStore } from "@/store/modules/search";
import { createNewCollectionItem } from "@/utils/collections";

const validationMessage = {
  alreadyCreated: "this item already created",
};
const store = useCollectionStore();
// const searchStore = useSearchStore();
const name = ref("");
const validation = ref();
const isAlreadyCreated = () =>
  store.activeCollectionGroup.some((item) => item.name === name.value.trim());
const addElement = () => {
  if (!name?.value?.trim()) return;
  if (isAlreadyCreated()) {
    validation.value = validationMessage.alreadyCreated;
    return;
  }
  validation.value = "";
  const newItem = createNewCollectionItem(name.value.trim());
  store.ADD_ELEMENT_TO_COLLECTION(store.activeCollectionIndex, newItem);
  store.saveChangesToCollection(store.activeCollectionId);
  name.value = "";
};
</script>

<template>
  <form class="form" @submit.prevent="addElement()">
    <inputUI
      v-model="name"
      id="item"
      title="Add element"
      :validation="validation"
    />
    <btnUI type="submit" color="green">Add element</btnUI>
    <!-- <button @click="searchStore.searchGamesTitle('wit')">213</button> -->
  </form>
</template>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 260px;
  margin: 10px auto 0px;
}
</style>
