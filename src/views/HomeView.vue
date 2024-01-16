<template>
  <div class="home">
    <BtnUI v-if="isUserLogin" @click="logout" color="red">Logout</BtnUI>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getData } from "@/utils/localStorageVar";
import { useLoginStore } from "@/store/modules/login";
import { computed } from "vue";
import BtnUI from "@/components/ui/btnUI.vue";

const store = useLoginStore();
const router = useRouter();
const isUserLogin = computed(() => store.isUserLogin);
const logout = () => {
  store.logout();
};
async function autoLogin() {
  const userId = getData("userId");
  if (userId && !isUserLogin.value) await store.getCurrentUser(userId);
  if (!isUserLogin.value) {
    router.push("/login");
  }
}
autoLogin();
</script>
