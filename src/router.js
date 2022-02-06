import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/vue/pages/HomePage.vue";
import HistoryPage from "@/vue/pages/history/HistoryPage.vue";
import AdditionHistoryPage from "@/vue/pages/history/AdditionHistoryPage.vue";
import DeletionHistoryPage from "@/vue/pages/history/DeletionHistoryPage.vue";

const routes = [
  { path: "/", component: HomePage, name: "HomePage" },
  { path: "/history", component: HistoryPage, name: "HistoryPage" },
  { path: "/addition-history", component: AdditionHistoryPage, name: "AdditionHistoryPage" },
  { path: "/deletion-history", component: DeletionHistoryPage, name: "DeletionHistoryPage" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
