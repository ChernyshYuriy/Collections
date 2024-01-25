<script setup>
import btnUIVue from "../btnUI.vue";
import modalUI from "../modalUI.vue";
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  confirmFunc: {
    type: Function,
  },
});
const emit = defineEmits(["hideModal"]);
function hideModal() {
  console.log(12);
  emit("hideModal");
}
</script>

<template>
  <modalUI @close="hideModal()">
    <template #header> Are you sure? </template>
    <template #body>
      <div class="collection-group">
        <btnUIVue color="green" @click="props.confirmFunc()">Yes</btnUIVue>
        <btnUIVue color="red" @click="hideModal()">No</btnUIVue>
      </div>
    </template>
  </modalUI>
</template>
<style lang="scss" scoped>
.collection-group {
  display: flex;
  justify-content: space-around;
  width: 140px;
}
</style>
