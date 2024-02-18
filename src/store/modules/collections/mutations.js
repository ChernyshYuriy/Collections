import {
  saveDeletedCollection,
  sortActiveCollection,
  sortAllCollections,
} from "@/utils/collections";

export default {
  // getting and sorting
  SET_ALL_COLLECTIONS(collection) {
    const loadedCollections = collection.data.results;
    if (!loadedCollections?.length) return;
    this.collections = sortAllCollections(loadedCollections);
    this.activeCollectionId = loadedCollections[0].objectId;
  },
  SET_ACTIVE_COLLECTION_ITEM(id) {
    this.activeCollectionItem = this.activeCollectionGroup.find(
      (item) => item.id === id
    );
  },
  SORT_COLLECTION(group = "main") {
    const collection = this.collections[this.activeCollectionIndex].collection;
    collection[group] = sortActiveCollection(collection);
  },
  // addings
  ADD_ELEMENT_TO_COLLECTION(element, group = "main") {
    this.collections[this.activeCollectionIndex].collection[group].push(
      element
    );
    this.SORT_COLLECTION(group);
  },
  // change
  CHANGE_COLLECTION_ELEMENT(newItem, group = "main") {
    const index = this.collections[this.activeCollectionIndex].collection[
      group
    ].findIndex((element) => {
      return element.id === newItem.id;
    });
    this.collections[this.activeCollectionIndex].collection[group][index] =
      newItem;
  },
  CHANGE_ACTIVE_COLLECTION(newCollectionId) {
    this.activeCollectionId = newCollectionId;
  },
  CHANGE_COLLECTION_NAME(id, newName) {
    const index = this.collections.findIndex(
      (collection) => collection.objectId === id
    );
    this.collections[index].name = newName;
  },
  //remove
  REMOVE_ELEMENT_FROM_COLLECTION(
    id,
    collectionIndex = this.activeCollectionIndex,
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
};
