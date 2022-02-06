<script setup>
import { useUsers } from "@/code/hooks/useUsers";
import { ref, watch } from "vue";
import { useRouter } from "@/base/vue";

const { users } = useUsers();

const pages = [
  {
    title: "Home",
    routeName: "HomePage",
  },
  {
    title: "History",
    routeName: "HistoryPage",
  },
  {
    title: "Addition history",
    routeName: "AdditionHistoryPage",
  },
  {
    title: "Deletion history",
    routeName: "DeletionHistoryPage",
  },
];

const { route } = useRouter();
const transitionName = ref("");
watch(() => route.value, handler);

function handler(to, from) {
  const toIndex = pages.findIndex((page) => page.routeName === to.name);
  const fromIndex = pages.findIndex((page) => page.routeName === from.name);

  if (toIndex === -1 || fromIndex === -1) {
    transitionName.value = "fade";
    return;
  }

  transitionName.value = toIndex < fromIndex ? "slide-right" : "slide-left";
}

const favUsersIds = ref([]);
const historyEvents = ref([]);

function addToFavs(user) {
  favUsersIds.value.push(user.id);

  historyEvents.value.push({
    date: new Date().getTime(),
    id: user.id,
    name: user.name,
    type: "add",
  });
}
function removeFromFavs(user) {
  favUsersIds.value.splice(favUsersIds.value.indexOf(user.id), 1);

  historyEvents.value.push({
    date: new Date().getTime(),
    id: user.id,
    name: user.name,
    type: "del",
  });
}
</script>

<template>
  <div class="app">
    <div class="app-nav">
      <router-link
        v-for="(page, idx) in pages"
        :key="idx"
        :to="{ name: page.routeName }"
        :exact="page.exact || false"
        class="app-nav__item"
      >
        {{ page.title }}
      </router-link>
    </div>

    <router-view
      v-slot="{ Component }"
      :users="users"
      :favUsersIds="favUsersIds"
      :historyEvents="historyEvents"
      @addToFavs="addToFavs"
      @removeFromFavs="removeFromFavs"
    >
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
