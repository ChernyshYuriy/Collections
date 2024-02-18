<script setup>
import BtnUI from "@/components/ui/btnUI.vue";
import inputUI from "@/components/ui/inputUI.vue";
import ModalUI from "@/components/ui/modals/modalUI.vue";
import { useCollectionStore } from "@/store/modules/collections";
import { useLoginStore } from "@/store/modules/login";
import { ref, defineEmits } from "vue";
const storeCollection = useCollectionStore();
const storeUser = useLoginStore();
const emit = defineEmits(["hideAddCollection"]);
async function createCollection() {
  await storeCollection.createCollection(
    newCollectionName.value,
    storeUser.user.objectId
  );
  await storeCollection.getAllCollections(storeUser.user.objectId);
  emit("hideAddCollection");
}
const newCollectionName = ref("");
</script>

<template>
  <ModalUI @close="emit('hideAddCollection')">
    <template #header>Create new Collection</template>
    <template #body>
      <inputUI
        id="newCollection"
        v-model="newCollectionName"
        title="New collection name"
      />
      <BtnUI
        :disabled="!newCollectionName.length"
        @click="createCollection()"
        color="green"
        >Create</BtnUI
      >
    </template>
  </ModalUI>
</template>

<style lang="scss" scoped></style>
