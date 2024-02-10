<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { copyValue } from "@/utils/global";
import btnUI from "./btnUI.vue";

defineProps({
  modelValue: String,
  inputType: {
    type: String,
    default() {
      return "";
    },
  },
  title: {
    type: String,
    default() {
      return "";
    },
  },
  placeholder: {
    type: String,
    default() {
      return "";
    },
  },
  id: {
    type: String,
    required: true,
  },
  validation: {
    type: String,
    default() {
      return "";
    },
  },
  showValidation: {
    type: Boolean,
    default() {
      return true;
    },
  },
  showHidePassword: {
    type: Boolean,
    default() {
      return false;
    },
  },
  showCopyBtn: {
    type: Boolean,
    default() {
      return false;
    },
  },
});
defineEmits(["update:modelValue"]);
const showPassword = ref(false);
function getImgUrl(fileName) {
  return require("../../assets/svg/" + fileName);
}
function changeShopPassword() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div class="input">
    <label class="input__label" :for="id"
      >{{ title }}
      <btnUI
        size="tiny"
        color="black"
        v-if="showCopyBtn"
        @click.prevent="copyValue(modelValue)"
      >
        copy
      </btnUI>
    </label>

    <template v-if="showHidePassword && inputType === 'password'">
      <span class="input-filed">
        <input
          class="input-filed__element"
          :type="showPassword ? 'text' : 'password'"
          :id="id"
          :value="modelValue"
          :placeholder="placeholder"
          @input="$emit('update:modelValue', $event.target.value)"
        />

        <span
          class="input-filed__password-visibility"
          @click="changeShopPassword()"
        >
          <img
            :src="getImgUrl(`eye-${showPassword ? 'show' : 'off'}.svg`)"
            alt=""
          />
        </span>
      </span>
    </template>
    <template v-else>
      <input
        class="input__element"
        :type="inputType"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </template>

    <span class="input__validation">{{
      showValidation ? validation : ""
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
@mixin input {
  width: 250px;
  border-radius: 8px;
  height: 20px;
  font-size: 16px;
  padding: 5px;
  border: none;
  outline: 1px solid $black;
}
.input {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__label {
    width: 260px;
    margin-top: 12px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__element {
    @include input;
  }
  &__validation {
    color: $red;
    min-height: 36px;
    text-align: center;
  }
}
.input-filed {
  position: relative;
  cursor: pointer;
  &__element {
    @include input;
  }
  &__password-visibility {
    & img {
      width: 20px;
    }
    width: 32px;
    height: 30px;
    position: absolute;
    background-color: $white;
    top: 0px;
    right: 0px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
