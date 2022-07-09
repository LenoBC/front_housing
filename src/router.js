import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import NotFound from "./pages/NotFound.vue";
import ImmovablePage from "./pages/immovable/ImmovablePage.vue";
import ImmovableBuilding from "./pages/immovable/ImmovableBuilding.vue"
import ImmovableFlat from "./pages/immovable/ImmovableFlat.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/immovable", component: ImmovablePage},
    { path: '/immovable/building', component: ImmovableBuilding},
    { path: '/immovable/flat', component: ImmovableFlat},
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
