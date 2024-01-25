<template>
  <div class="home">
    <div class="home__actions">
      <BtnUI v-if="isUserLogin" @click="addCollection()" color="blue"
        >Add new collection</BtnUI
      >
      <BtnUI v-if="isUserLogin" @click="storeLogin.logout()" color="red"
        >Logout</BtnUI
      >
    </div>
    <AddNewCollection
      v-if="showAddCollectionModal"
      @hideAddCollection="hideAddCollection()"
    />
    <Collections />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getData } from "@/utils/localStorageVar";
import { useLoginStore } from "@/store/modules/login";
import { useCollectionStore } from "@/store/modules/collections";
import { ref, computed, onMounted } from "vue";
import BtnUI from "@/components/ui/btnUI.vue";
import Collections from "@/components/collection/indexComponent.vue";
import AddNewCollection from "@/components/collection/addNewCollection.vue";

const storeLogin = useLoginStore();
const storeCollection = useCollectionStore();
const router = useRouter();
const isUserLogin = computed(() => storeLogin.isUserLogin);
const showAddCollectionModal = ref(false);

function addCollection() {
  console.log(1);
  showAddCollectionModal.value = true;
}
function hideAddCollection() {
  showAddCollectionModal.value = false;
}
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
});
</script>
<style lang="scss" scoped>
.home {
  &__actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>
