<script setup>
import btnUIVue from "../btnUI.vue";
import inputUI from "../inputUI.vue";
import modalUI from "../modalUI.vue";
import { defineProps, defineEmits } from "vue";
import { ref, computed } from "vue";
const props = defineProps({
  confirmFunc: {
    type: Function,
  },
  confirmWithInput: {
    type: Boolean,
    default: false,
  },
  requiredInputToConfirm: {
    type: String,
    default: "",
  },
});
const inputValue = ref("");
const inputTitle = `Enter "${props.requiredInputToConfirm}" to continue`;
const isInputCorrect = computed(
  () =>
    inputValue.value.toLocaleLowerCase() ===
    props.requiredInputToConfirm.toLocaleLowerCase()
);
const emit = defineEmits(["hideModal"]);
function hideModal() {
  emit("hideModal");
}
</script>

<template>
  <modalUI @close="hideModal()">
    <template #header> Are you sure? </template>
    <template #body>
      <inputUI
        v-if="confirmWithInput"
        id="confirmInput"
        :title="inputTitle"
        v-model="inputValue"
      />
      <div class="btn-group">
        <btnUIVue
          color="green"
          :disabled="!isInputCorrect"
          @click="props.confirmFunc()"
          >Yes</btnUIVue
        >
        <btnUIVue color="red" @click="hideModal()">No</btnUIVue>
      </div>
    </template>
  </modalUI>
</template>
<style lang="scss" scoped>
.btn-group {
  display: flex;
  justify-content: space-evenly;
  min-width: 140px;
  width: 100%;
}
</style>
