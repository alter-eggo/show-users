<script setup>
import { computed, ref } from "vue";
import ListElement from "../components/ListElement.vue";
import FilterInput from "../components/FilterInput.vue";
import { DynamicScroller } from "vue-virtual-scroller";
import { debounce } from "@/base/async";
import { filterAndSortUsersList, flatList } from "@/code/utils/user";

const FILTER_DEBOUNCE_TIME = 300;

const props = defineProps({
  favUsersIds: Array,
  users: Array,
});

const text = ref("");

function onChange(value) {
  text.value = value;
}

const debouncedChange = debounce(onChange, FILTER_DEBOUNCE_TIME);

const filteredUsers = computed(() =>
  filterAndSortUsersList(props.users, props.favUsersIds, text.value)
);

const favUsers = computed(() =>
  flatList(props.users).filter((user) => props.favUsersIds.includes(user.id))
);
</script>

<template>
  <div class="home-page">
    <div class="home-page__users">
      <FilterInput class="home-page__filter" @onChange="debouncedChange" />

      <div class="home-page__scroller" v-if="filteredUsers.length">
        <DynamicScroller
          :items="filteredUsers"
          :min-item-size="50"
          class="scroller"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              class="home-page__user"
              :class="{ 'home-page__user-child': item.isChild }"
              :index="index"
              :active="active"
              key-field="id"
              :size-dependencies="[item.name]"
            >
              <ListElement
                :user="item"
                btnText="Add to favourite"
                @onClick="$emit('addToFavs', item)"
              />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </div>
      <template v-else> There is no suited users </template>
    </div>

    <div class="home-page__divider"></div>

    <div class="home-page__users">
      <div class="home-page__users-fav-title">Fav users</div>
      <template v-if="favUsers.length">
        <ListElement
          v-for="user in favUsers"
          :key="user.id"
          :user="user"
          btnText="Remove from favs"
          @onClick="$emit('removeFromFavs', user)"
        />
      </template>
      <template v-else> Fav users list is empty </template>
    </div>
  </div>
</template>

<style lang="sass">
.home-page
  height: 100%
  width: 100%
  position: relative
  display: flex
  justify-content: space-between
  overflow: hidden

  &__divider
    border: 1px solid black

  &__users
    display: flex
    flex-direction: column
    padding: 0 40px
    position: relative
    height: 100%
    flex: 1

    &-fav-title
      margin-bottom: 40px
      display: flex
      justify-content: center

  &__user
    min-height: 30px

    &-child
      margin-left: 8px

    &-children
      margin-left: 16px



  &__scroller
    overflow: hidden
    height: 100%
  &__filter
    margin-bottom: 40px
    display: flex
    justify-content: center


.scroller
  width: 100%
  height: 100%
  overflow-y: auto
</style>
