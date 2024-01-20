<script setup>
import { ref } from "vue";
import btnUI from "../ui/btnUI.vue";
import inputUI from "../ui/inputUI.vue";
import { useCollectionStore } from "@/store/modules/collections";
import { createNewCollectionItem } from "@/utils/collections";

const store = useCollectionStore();
const name = ref();
const addElement = () => {
  const newItem = createNewCollectionItem(name.value);
  store.ADD_ELEMENT_TO_COLLECTION(0, newItem);
  store.saveChangesToCollection(store.activeCollectionId);
  name.value = "";
};
</script>

<template>
  <form class="form" @submit.prevent="addElement()">
    <inputUI v-model="name" id="item" title="Add element" />
    <btnUI color="green">Add element</btnUI>
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
