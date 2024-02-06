import {
  saveDeletedCollection,
  sortActiveCollection,
  sortAllCollections,
} from "@/utils/collections";

export default {
  SET_ALL_COLLECTIONS(collection) {
    const loadedCollections = collection.data.results;
    if (!loadedCollections?.length) return;
    this.collections = sortAllCollections(loadedCollections);
    this.activeCollectionId = loadedCollections[0].objectId;
  },
  ADD_ELEMENT_TO_COLLECTION(collectionIndex, element, group = "main") {
    this.collections[collectionIndex].collection[group].push(element);
    this.SORT_COLLECTION(collectionIndex, group);
  },
  SORT_COLLECTION(collectionIndex, group = "main") {
    const collection = this.collections[collectionIndex].collection;
    collection[group] = sortActiveCollection(collection);
  },
  CHANGE_COLLECTION_ELEMENT(collectionIndex, newItem, group = "main") {
    const index = this.collections[collectionIndex].collection[group].findIndex(
      (element) => {
        return element.id === newItem.id;
      }
    );
    this.collections[collectionIndex].collection[group][index] = newItem;
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
  REMOVE_COLLECTION(collectionId) {
    const index = this.collections.findIndex(
      (element) => element.objectId === collectionId
    );
    saveDeletedCollection(this.collections[index]);
    this.collections.splice(index, 1);
  },
  CHANGE_ACTIVE_COLLECTION(newCollectionId) {
    this.activeCollectionId = newCollectionId;
  },
  CHANGE_COLLECTION_NAME(id, newName) {
    const index = this.collections.findIndex(
      (collection) => collection.objectId === id
    );
    console.log(index, `index`);
    this.collections[index].name = newName;
  },
};
