<script setup>
import RatingUI from "@/components/ui/ratingUI.vue";
import InputUI from "@/components/ui/inputUI.vue";
import btnUI from "@/components/ui/btnUI.vue";
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  isControlPanel: Boolean,
  name: String,
  rating: Number,
  link: String,
});
const name = ref(props.name);
const rating = ref(props.rating || 0);
const link = ref(props.link || "");
const emit = defineEmits(["saveChanges"]);
function submitAction() {
  const editedData = {
    name,
    rating,
    link,
  };
  console.log(editedData, `editedData`);
  emit("saveChanges", editedData);
}
</script>
<template>
  <form @submit.prevent="submitAction()" class="collection-edit-item">
    <div class="collection-edit-item__panel panel">
      <InputUI
        v-model="name"
        id="item-name"
        title="Edit name"
        :showCopyBtn="true"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <template v-if="!isControlPanel">
        <RatingUI
          class="collection-edit-item__rating"
          v-model="rating"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <InputUI
          v-model="link"
          id="item-link"
          title="Edit link"
          :showCopyBtn="true"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </template>
    </div>
    <btnUI class="collection-edit-item__btn" color="green" type="submit"
      >Save changes
    </btnUI>
  </form>
</template>

<style lang="scss" scoped>
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
