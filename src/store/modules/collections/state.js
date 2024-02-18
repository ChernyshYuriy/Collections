import mutations from "./mutations";

export default () => ({
  collections: [],
  activeCollectionId: "",
  activeCollectionItem: {},
  activeGroup: "main",
  ...mutations,
});
