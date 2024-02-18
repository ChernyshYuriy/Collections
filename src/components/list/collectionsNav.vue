<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted } from "vue";
import { navControlId } from "@/static/nav";
defineProps({
  collectionsList: {
    type: Array,
  },
  activeCollectionId: {
    type: String,
  },
});
const costumeNavigation = reactive({
  name: "Control",
  id: navControlId,
});
const emit = defineEmits(["changeCollection"]);
const navItemCollectionRef = ref(null);
const navItemControlRef = ref(null);
const sumNavigationWidth = ref(0);
const screenWidth = ref(window.innerWidth);

onMounted(() => {
  const controlWidth = navItemControlRef?.value?.offsetWidth;
  const itemWidth = navItemCollectionRef.value.reduce(
    (accumulatorWidth, elementDOM) => elementDOM.offsetWidth + accumulatorWidth,
    0
  );
  sumNavigationWidth.value = controlWidth + itemWidth;
});
</script>
<template>
  <div class="nav" :class="{ 'nav--scroll': sumNavigationWidth > screenWidth }">
    <div
      class="nav__item"
      :class="{
        'nav__item--active': item.objectId === activeCollectionId,
      }"
      ref="navItemCollectionRef"
      v-for="item in collectionsList"
      :key="item.objectId"
      @click="emit('changeCollection', item.objectId)"
    >
      {{ item.name }}
    </div>
    <div
      class="nav__item"
      :class="{
        'nav__item--active': costumeNavigation.id === activeCollectionId,
      }"
      ref="navItemControlRef"
      @click="emit('changeCollection', costumeNavigation.id)"
    >
      {{ costumeNavigation.name }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav {
  &--scroll {
    overflow: scroll;
    justify-content: flex-start;
  }
  &__item {
    background-color: $green;
    padding: 12px 20px 16px;
    color: $white;
    outline: 1px solid $white;
    cursor: pointer;
    &--active {
      background-color: $white;
      color: $black;
      border: 1px solid $green;
      outline: none;
    }
  }
}
</style>
