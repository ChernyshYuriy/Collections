import localStorageKeys, { setData, deleteData } from "@/utils/localStorageVar";
import router from "@/router";
import cookieKeys, { deleteCookie, setCookie } from "@/utils/cookie";

export default {
  SET_NEW_USER(newUser) {
    this.user = newUser;
    this.isUserLogin = !!Object.keys(newUser)?.length;
    if (!!newUser.objectId && !!newUser.sessionToken) {
      // set userId and session to localStorage and encrypting it
      setData(newUser.objectId, localStorageKeys.userId);
      // set sessionKey to cookey
      setCookie(cookieKeys.session, newUser.sessionToken, 30);
    }
    router.push({ name: "home" });
  },
  DELETE_USER() {
    this.user = {};
    this.isUserLogin = false;
    // delete userId from localStorage
    deleteData(localStorageKeys.userId);
    // delete cookie session key
    deleteCookie(cookieKeys.session);
    router.push({ name: "login" });
  },
  SET_VALIDATION_ERROR(error) {
    this.validation = error;
  },
  SHOW_VALIDATION(status) {
    this.showValidation = status;
  },
};
