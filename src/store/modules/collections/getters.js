export default {
  collectionsData: (state) =>
    state.collections.map((item, index) => ({ ...item, index })),
  collectionsList: (state) =>
    state.collections.map((item) => ({
      name: item.name,
      objectId: item.objectId,
    })),
  activeCollection: (state) =>
    state.collections.find(
      (item) => item.objectId === state.activeCollectionId
    ),
  activeCollectionGroup: (state) =>
    state.collections.find((item) => item.objectId === state.activeCollectionId)
      ?.collection[state.activeGroup],
};
