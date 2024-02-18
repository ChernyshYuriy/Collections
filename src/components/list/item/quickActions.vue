<script setup>
import btnUI from "@/components/ui/btnUI.vue";
import trashSvg from "@/assets/svg/trash-red.svg";
import { defineEmits, defineProps } from "vue";
import { useCollectionStore } from "@/store/modules/collections";
import { redirectItemPage } from "@/utils/pageRedirect";
const collectionStore = useCollectionStore();
defineEmits(["showConfirmModal", "showQuickEdit"]);
defineProps({
  id: String,
  link: String,
});
</script>
<template>
  <div class="actions-group">
    <btnUI color="blue" @click="$emit('showQuickEdit')">Quick Edit</btnUI>
    <btnUI
      color="blue"
      @click="redirectItemPage(collectionStore.activeCollectionTitle, id)"
      >View page</btnUI
    >
    <a v-if="link" :href="link" target="_blank">
      <btnUI color="blue">Link</btnUI></a
    >
    <btnUI @click="$emit('showConfirmModal')"
      ><img class="svg" :src="trashSvg" alt=""
    /></btnUI>
  </div>
</template>

<style lang="scss" scoped>
.actions-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px 0px;
  & img {
    width: 18px;
    height: 18px;
  }
}
</style>
