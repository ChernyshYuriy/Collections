<script setup>
import { defineProps, ref } from "vue";
import btnUI from "../ui/btnUI.vue";
import trashSvg from "@/assets/svg/trash-red.svg";
import { useCollectionStore } from "@/store/modules/collections";
import ConfirmModal from "../ui/modals/confirmModal.vue";
const collectionsStore = useCollectionStore();
const props = defineProps({
  item: {
    type: Object,
  },
});
function deleteItem() {
  collectionsStore.REMOVE_ELEMENT_FROM_COLLECTION(
    collectionsStore.activeCollectionIndex,
    props.item.id
  );
  collectionsStore.saveChangesToCollection(collectionsStore.activeCollectionId);
}

function showConfirmModal(status) {
  isShowConfirmModal.value = status;
}
const isShowConfirmModal = ref(false);
</script>
<template>
  <div class="collection-item">
    <div class="title">{{ props.item.name }}</div>
    <btnUI size="small" @click="showConfirmModal(true)"
      ><img class="svg" :src="trashSvg" alt=""
    /></btnUI>
    <ConfirmModal
      v-if="isShowConfirmModal"
      :confirm-func="deleteItem"
      @hideModal="showConfirmModal(false)"
    />
  </div>
</template>
<style lang="scss">
.collection-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;

  button img {
    width: 12px;
  }

  & .title {
    &::first-letter {
      text-transform: capitalize;
    }
  }

  &:nth-child(2n + 1) {
    background-color: #f3f3f3;
  }
}
</style>
