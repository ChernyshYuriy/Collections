import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "../views/LoginView";
import ItemPage from "../views/ItemView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",

    component: Login,
  },
  {
    path: "/item/:collection/:id",
    name: "item-page",
    component: ItemPage,
    props: true, // This allows the route params to be passed as props to the component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
