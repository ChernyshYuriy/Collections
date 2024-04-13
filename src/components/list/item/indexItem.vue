<script setup>
import { defineProps, ref } from "vue";
import { useCollectionStore } from "@/store/modules/collections";
import btnUI from "@/components/ui//btnUI.vue";
import dropElement from "@/components/ui/dropElement.vue";
import ConfirmModal from "@/components/ui/modals/confirmModal.vue";
import TextBlock from "@/components/ui/textBlock.vue";
import { createNewCollectionItem } from "@/utils/collections";
import quickEdit from "@/components/list/item/quickEdit.vue";
import modalUI from "@/components/ui/modals/modalUI.vue";
import quickActions from "@/components/list/item/quickActions.vue";
import { redirectItemPage } from "@/utils/pageRedirect";

const collectionsStore = useCollectionStore();
const props = defineProps({
  item: {
    type: Object,
  },
  isControlPanel: {
    type: Boolean,
    default: false,
  },
});
const showQuickEdit = ref(false);
function deleteItem() {
  collectionsStore.REMOVE_ELEMENT_FROM_COLLECTION(props.item.id);
  collectionsStore.saveChangesToCollection(collectionsStore.activeCollectionId);
}
function deleteCollection() {
  collectionsStore.deleteCollection(props.item.objectId);
}

function showConfirmModal(status) {
  isShowConfirmModal.value = status;
}
function saveItemChanges({ name, rating, ratingReview, isChecked, link }) {
  const newItem = createNewCollectionItem(
    name,
    rating,
    ratingReview,
    isChecked,
    link,
    props.item.id
  );
  collectionsStore.CHANGE_COLLECTION_ELEMENT(newItem);
  collectionsStore.SORT_COLLECTION();
  collectionsStore.saveChangesToCollection(collectionsStore.activeCollectionId);
  showDropContent.value = false;
}
function saveCollectionChanges({ name }) {
  collectionsStore.CHANGE_COLLECTION_NAME(props.item.objectId, name);
  collectionsStore.saveChangesToCollection(props.item.objectId, {
    name,
  });
}
function editSubmitAction(changedData) {
  props.isControlPanel
    ? saveCollectionChanges(changedData)
    : saveItemChanges(changedData);
}
const isShowConfirmModal = ref(false);
const confirmModalDescription = `Delete "${props.item.name}"`;
const showDropContent = ref(false);
</script>
<template>
  <dropElement class="drop-element" :is-open-status="showDropContent">
    <template #main>
      <div class="collection-item-main">
        <component
          :is="props.item.link ? 'a' : 'div'"
          :href="props.item.link"
          target="_blank"
          :class="{ title: !props.item.link }"
        >
          {{ props.item.name }}
        </component>

        <span class="collection-item-main__rating">
          {{ props.item.rating }}
        </span>
        <span class="collection-item-main__rating">
          {{ props.item.ratingReview ? `${props.item.ratingReview}/100` : "" }}
        </span>
        <span>{{ props.item.isChecked }}</span>
        <span class="collection-item-main__actions">
          <btnUI
            size="small"
            color="blue"
            @click="showDropContent = !showDropContent"
            >{{ showDropContent ? "hide" : "show" }}</btnUI
          >
        </span>
      </div>
    </template>
    <template #content>
      <template v-if="!props.isControlPanel">
        <quickActions
          :link="props.item.link"
          :id="props.item.id"
          @showConfirmModal="showConfirmModal(true)"
          @showQuickEdit="showQuickEdit = true"
        />
        <TextBlock v-if="props.item.description">
          <template #header> Description </template>
          <template #body>{{ props.item.description }} </template>
        </TextBlock>
        <!-- <TextBlock v-if="props.item.review?.text">
        <template #header> Description </template>
        <template #body>{{ props.item.review.text }} </template>
      </TextBlock> -->
        <!-- Review ratings 10/10 100/100 count pluses and minuses BtnUI -->
        <div class="row row--center row--gap-20">
          <btnUI
            color="blue"
            @click="
              redirectItemPage(
                collectionsStore.activeCollectionTitle,
                props.item.id,
                { edit: true }
              )
            "
            >Full edit</btnUI
          >
          <btnUI
            color="green"
            @click="
              redirectItemPage(
                collectionsStore.activeCollectionTitle,
                props.item.id
              )
            "
            >{{ props.item.name }} page</btnUI
          >
        </div></template
      >
      <template v-else
        ><quickActions
          :id="props.item.id"
          :isControlPanel="props.isControlPanel"
          @showConfirmModal="showConfirmModal(true)"
          @showQuickEdit="showQuickEdit = true"
      /></template>

      <ConfirmModal
        v-if="isShowConfirmModal"
        :confirm-func="!props.isControlPanel ? deleteItem : deleteCollection"
        :confirmWithInput="props.isControlPanel"
        :requiredInputToConfirm="props.isControlPanel ? props.item.name : ''"
        :description="!props.isControlPanel ? confirmModalDescription : ''"
        @hideModal="showConfirmModal(false)"
      />
      <modalUI v-if="showQuickEdit" @close="showQuickEdit = false">
        <template #header> Quick Edit </template>
        <template #body>
          <quickEdit
            :isControlPanel="props.isControlPanel"
            :name="props.item.name"
            :rating="props.item.rating"
            :rating-review="props.item.ratingReview"
            :is-checked="props.item.isChecked"
            :link="props.item.rating"
            @saveChanges="editSubmitAction($event)"
          />
        </template>
      </modalUI>
    </template>
  </dropElement>
</template>
<style lang="scss">
.drop-element:nth-child(2n + 1) .collection-item-main {
  background-color: $grayLight;
}

.collection-item-main {
  @include table-grid;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 10px;
  &__actions {
    display: flex;
    gap: 10px;
  }
  &__rating {
    text-align: center;
    height: fit-content;
  }

  & .title {
    width: 100%;
    overflow: hidden;
    max-height: 54px;
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
