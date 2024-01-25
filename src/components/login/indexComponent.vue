<script setup>
import { ref, computed, onMounted } from "vue";

import UiInput from "../ui/inputUI.vue";
import btnUI from "../ui/btnUI.vue";
import { useLoginStore } from "@/store/modules/login";
import { validEmail, isEmpty, validPassword } from "@/utils/validationInput";

const store = useLoginStore();
const userName = ref("");
const email = ref("");
const password = ref("");
const actionType = ref("login");
const loadingUser = ref(false);
const isLogin = computed(() => actionType.value === "login");

const changeTypeAction = () => {
  store.SHOW_VALIDATION(false);
  store.SET_VALIDATION_ERROR("");
  actionType.value = isLogin.value ? "createAccount" : "login";
};

const textAction = (revert = false) => {
  return revert
    ? isLogin.value
      ? "Create account"
      : "Login"
    : isLogin.value
    ? "Login"
    : "Create account";
};
const userNameValidation = computed(() => isEmpty(userName.value) || "");
const emailValidation = computed(
  () => isEmpty(email.value) || validEmail(email.value) || ""
);
const passwordValidation = computed(
  () => isEmpty(password.value) || validPassword(password.value) || ""
);
const isSubmitApproved = computed(() => {
  if (userNameValidation.value || passwordValidation.value) return false;
  if (!isLogin.value && emailValidation.value) return false;
  return true;
});

const submitAction = async () => {
  store.SHOW_VALIDATION(true);
  store.SET_VALIDATION_ERROR("");
  if (!isSubmitApproved.value) return;
  loadingUser.value = true;
  const params = {
    username: userName.value,
    password: password.value,
  };
  if (!isLogin.value) {
    params.email = email.value;
  }
  await store[isLogin.value ? "login" : "createAccount"](params);
  loadingUser.value = false;
};
onMounted(() => {
  store.SHOW_VALIDATION(false);
});
</script>

<template>
  <div class="login">
    <form class="login__form" @submit.prevent="submitAction">
      <UiInput
        v-model="userName"
        id="userName"
        title="User name"
        :validation="userNameValidation"
        :showValidation="store.showValidation"
      />
      <UiInput
        v-show="!isLogin"
        v-model="email"
        id="email"
        title="Email"
        :validation="emailValidation"
        :showValidation="store.showValidation"
      />
      <UiInput
        v-model="password"
        id="password"
        title="Password"
        inputType="password"
        :validation="passwordValidation"
        :showValidation="store.showValidation"
        :showHidePassword="true"
      />
      <div class="login__serve-validation" v-if="store.validation">
        {{ store.validation }}
      </div>
      <btnUI
        class="login__form-btn"
        color="green"
        type="submit"
        :loading="loadingUser"
      >
        {{ textAction() }}
      </btnUI>
    </form>
    <btnUI
      class="login__change-button"
      color="blue"
      :loading="loadingUser"
      @click="changeTypeAction"
    >
      change to {{ textAction(true) }}
    </btnUI>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/login.scss";
</style>
