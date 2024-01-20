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
