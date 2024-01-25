// import localStorageKeys, { setData, deleteData } from "@/utils/localStorageVar";
// import router from "@/router";
// import cookieKeys, { deleteCookie, setCookie } from "@/utils/cookie";

export default {
  SET_ALL_COLLECTIONS(collection) {
    const loadedCollections = collection.data.results;
    this.collections = loadedCollections;
    if (!loadedCollections?.length) return;
    this.activeCollectionId = loadedCollections[0].objectId;
  },
  ADD_ELEMENT_TO_COLLECTION(collectionIndex, element, group = "main") {
    this.collections[collectionIndex].collection[group].push(element);
  },
  REMOVE_ELEMENT_FROM_COLLECTION(
    collectionIndex = this.activeCollectionIndex,
    id,
    group = "main"
  ) {
    const index = this.collections[collectionIndex].collection[group].findIndex(
      (element) => element.id === id
    );
    this.collections[collectionIndex].collection[group].splice(index, 1);
  },
  CHANGE_ACTIVE_COLLECTION(newCollectionId) {
    this.activeCollectionId = newCollectionId;
  },
};
