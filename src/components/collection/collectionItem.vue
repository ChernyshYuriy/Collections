<script setup>
import { defineProps, ref } from "vue";
import btnUI from "../ui/btnUI.vue";
import trashSvg from "@/assets/svg/trash-red.svg";
import { useCollectionStore } from "@/store/modules/collections";
import ConfirmModal from "../ui/modals/confirmModal.vue";
import dropElement from "../ui/dropElement.vue";
import RatingUI from "../ui/ratingUI.vue";

import { createNewCollectionItem } from "@/utils/collections";
import InputUI from "../ui/inputUI.vue";

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
const rating = ref(props.item.rating || 0);
const name = ref(props.item.name);
function deleteItem() {
  collectionsStore.REMOVE_ELEMENT_FROM_COLLECTION(
    collectionsStore.activeCollectionIndex,
    props.item.id
  );
  collectionsStore.saveChangesToCollection(collectionsStore.activeCollectionId);
}
function deleteCollection() {
  collectionsStore.deleteCollection(props.item.objectId);
}

function showConfirmModal(status) {
  isShowConfirmModal.value = status;
}
function saveItemChanges() {
  const newItem = createNewCollectionItem(name, rating.value, props.item.id);
  collectionsStore.CHANGE_COLLECTION_ELEMENT(
    collectionsStore.activeCollectionIndex,
    newItem
  );
  collectionsStore.SORT_COLLECTION(collectionsStore.activeCollectionIndex);
  collectionsStore.saveChangesToCollection(collectionsStore.activeCollectionId);
  showDropContent.value = false;
}
const isShowConfirmModal = ref(false);
const confirmModalDescription = `Delete "${props.item.name}"`;
const showDropContent = ref(false);
</script>
<template>
  <dropElement class="drop-element" :is-open-status="showDropContent">
    <template #main>
      <div class="collection-item-main">
        <div class="title">{{ props.item.name }}</div>
        <span class="collection-item-main__rating">
          {{ props.item.rating }}
        </span>
        <span class="collection-item-main__actions">
          <btnUI
            size="small"
            color="blue"
            @click="showDropContent = !showDropContent"
            >edit</btnUI
          >
          <btnUI size="small" @click="showConfirmModal(true)"
            ><img class="svg" :src="trashSvg" alt=""
          /></btnUI>
        </span>

        <template v-if="isShowConfirmModal">
          <ConfirmModal
            v-if="!props.isFullCollection"
            :confirm-func="deleteItem"
            :description="confirmModalDescription"
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
    <template #content>
      <form @submit.prevent="saveItemChanges()" class="collection-edit-item">
        <div class="collection-edit-item__panel panel">
          <InputUI v-model="name" id="item-name" title="Edit name" />
          <RatingUI class="collection-edit-item__rating" v-model="rating" />
        </div>
        <btnUI class="collection-edit-item__btn" color="green" type="submit"
          >Save changes
        </btnUI>
      </form>
    </template>
  </dropElement>
</template>
<style lang="scss">
.drop-element:nth-child(2n + 1) .collection-item-main {
  background-color: $grayLight;
}

.collection-item-main {
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: 1fr 34px auto;
  gap: 5px;
  padding: 10px;
  &__actions {
    display: flex;
    gap: 10px;
  }
  &__rating {
    text-align: center;
    height: 100%;
  }
  button img {
    width: 12px;
  }

  & .title {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
.collection-edit-item {
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-around;
  padding: 8px;
  &__panel {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .panel {
    &__rating {
    }
  }

  &__btn {
    margin: 0px auto;
    width: 130px;
  }
}
</style>
