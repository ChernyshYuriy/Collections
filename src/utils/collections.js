import localStorageKeys, {
  setItemLocalStorage,
  getItemLocalStorage,
} from "@/utils/localStorageVar";

const generateId = () =>
  btoa(Math.random(0, new Date().getTime()).toString()).slice(0, -10);
class Collection {
  constructor(name, rating, id) {
    this.name = name;
    this.id = id;
    this.rating = rating || 0;
  }
}

export const createNewCollectionItem = (name, rating, id = generateId()) => {
  return new Collection(name, rating, id);
};

export function saveDeletedCollection(newDeletedCollection) {
  const deletedCollections =
    getItemLocalStorage(localStorageKeys.deletedCollections) || [];

  setItemLocalStorage(localStorageKeys.deletedCollections, [
    ...deletedCollections,
    newDeletedCollection,
  ]);
}

export function sortAllCollections(collections) {
  return collections.map((element) => ({
    ...element,
    collection: {
      main: sortActiveCollection(element.collection),
    },
  }));
}
export function sortActiveCollection(collection, group = "main") {
  return collection[group].sort((a, b) => (b.rating || 0) - (a.rating || 0));
}
