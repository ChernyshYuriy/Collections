<template>
  <div class="home">
    <BtnUI v-if="isUserLogin" @click="logout" color="red">Logout</BtnUI>
    <Collections />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getData } from "@/utils/localStorageVar";
import { useLoginStore } from "@/store/modules/login";
import { useCollectionStore } from "@/store/modules/collections";
import { computed, onMounted } from "vue";
import BtnUI from "@/components/ui/btnUI.vue";
import Collections from "@/components/collection/indexComponent.vue";

const storeLogin = useLoginStore();
const storeCollection = useCollectionStore();
const router = useRouter();
const isUserLogin = computed(() => storeLogin.isUserLogin);
const logout = () => {
  storeLogin.logout();
};
async function autoLogin() {
  const userId = getData("userId");
  if (userId && !isUserLogin.value) await storeLogin.getCurrentUser(userId);
  if (!isUserLogin.value) {
    router.push("/login");
  }
}

onMounted(async () => {
  autoLogin();
  await storeCollection.getAllCollections(storeLogin.user.objectId);
  // await storeCollection.createCollection("dsadasd", {
  //   main: [213123, 3214214, 4124],
  // });
});
</script>
