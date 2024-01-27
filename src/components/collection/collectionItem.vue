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
  isFullCollection: {
    type: Boolean,
    default: false,
  },
});
function deleteItem() {
  collectionsStore.REMOVE_ELEMENT_FROM_COLLECTION(
    collectionsStore.activeCollectionIndex,
    props.item.id
  );
  collectionsStore.saveChangesToCollection(collectionsStore.activeCollectionId);
}
function deleteCollection() {
  collectionsStore.REMOVE_COLLECTION(props.item.objectId);
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
    <template v-if="isShowConfirmModal">
      <ConfirmModal
        v-if="!props.isFullCollection"
        :confirm-func="deleteItem"
        @hideModal="showConfirmModal(false)"
      />
      <ConfirmModal
        v-else
        :confirm-func="deleteCollection"
        @hideModal="showConfirmModal(false)"
        :confirmWithInput="true"
        :requiredInputToConfirm="props.item.name"
      />
    </template>
  </div>
</template>
<style lang="scss">
.collection-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  button img {
    width: 12px;
  }

  & .title {
    padding-right: 10px;
    &::first-letter {
      text-transform: capitalize;
    }
  }

  &:nth-child(2n + 1) {
    background-color: #f3f3f3;
  }
}
</style>
