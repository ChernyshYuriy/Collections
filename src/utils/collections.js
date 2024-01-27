import localStorageKeys, {
  setItemLocalStorage,
  getItemLocalStorage,
} from "@/utils/localStorageVar";

class Collection {
  constructor(name) {
    this.name = name;
    this.id = btoa(Math.random(0, new Date().getTime()).toString()).slice(
      0,
      -10
    );
  }
}

export const createNewCollectionItem = (name) => {
  return new Collection(name);
};

export function saveDeletedCollection(newDeletedCollection) {
  const deletedCollections =
    getItemLocalStorage(localStorageKeys.deletedCollections) || [];

  setItemLocalStorage(localStorageKeys.deletedCollections, [
    ...deletedCollections,
    newDeletedCollection,
  ]);
}
