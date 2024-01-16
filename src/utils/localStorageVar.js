const localStorageKeys = {
  session: "session",
  userId: "userId",
};
export default localStorageKeys;

let CryptoJS = require("crypto-js");
// key for encrypt decrypt data
const secKey =
  "90146612b271f53d435f3b60ea42cbc7e4b81cc82abc17cacc5ef4f48f13eabc";

// set data to key selected in localStorageKeys and encrypt data before save to localStorage
export const setData = (data, key) => {
  if (!localStorageKeys[key]) return;
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secKey
  ).toString();
  localStorage.setItem(localStorageKeys[key], encrypted);
};
// get data for localStorage and before return decrypting this data
export const getData = (key) => {
  if (!localStorageKeys[key]) return;
  const logDataEncrypted = localStorage.getItem(localStorageKeys[key]);
  if (!logDataEncrypted) return;
  const bytes = CryptoJS.AES.decrypt(logDataEncrypted, secKey);
  const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalData;
};

export const deleteData = (key) => {
  delete localStorage.removeItem(localStorageKeys[key]);
};

// default  localStorage actions
export const setItemLocalStorage = (key, data) => {
  localStorage.setItem(key, data);
};
export const getItemLocalStorage = (key) => {
  localStorage.getItem(key);
};
export const removeItemLocalStorage = (key) => {
  localStorage.removeItem(key);
};
