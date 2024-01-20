import mutations from "./mutations";

export default () => ({
  collections: [],
  activeCollectionId: "",
  activeGroup: "main",
  ...mutations,
});
