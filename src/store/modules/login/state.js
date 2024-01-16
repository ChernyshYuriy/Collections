import mutations from "./mutations";

export default () => ({
  user: {},
  isUserLogin: false,
  validation: "",
  showValidation: false,
  ...mutations,
});
