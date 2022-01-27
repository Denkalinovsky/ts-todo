import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ToDo from "@/views/ToDo.vue";
import Test from "@/views/Test.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "List",
    component: ToDo,
  },
  {
    path: "/list",
    name: "List",
    component: Test,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
