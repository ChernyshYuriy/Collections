import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import axios from "axios";
import { headers, baseURL } from "./api";
import { createPinia } from "pinia";
import cookieKeys, { getCookie } from "./utils/cookie";

const pinia = createPinia();
const { serveAppId, restApiKey } = headers;
axios.interceptors.request.use((config) => {
  config.headers[serveAppId.key] = serveAppId.value;
  config.headers[restApiKey.key] = restApiKey.value;
  const sessionId = getCookie(cookieKeys.session);
  if (sessionId) config.headers[cookieKeys.session] = sessionId;
  return config;
});

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL;
const app = createApp(App);
app.use(pinia);
app.use(router);
app.config.globalProperties.$axios = axios;

app.mount("#app");
