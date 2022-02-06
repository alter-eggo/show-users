<script setup>
defineProps({
  list: Array,
});

const header = ["type", "id", "name", "date"];
</script>
<template>
  <div class="history">
    <template v-if="list.length">
      <div class="history-row header">
        <div class="cell" v-for="item in header" :key="item">
          {{ item }}
        </div>
      </div>

      <div class="history-row" v-for="event in list" :key="event.date">
        <div class="cell">{{ event.type }}</div>
        <div class="cell">{{ event.id }}</div>
        <div class="cell">{{ event.name }}</div>
        <div class="cell">{{ event.date }}</div>
      </div>
    </template>

    <template v-else> History events list is empty </template>
  </div>
</template>

<style lang="sass">
.history-row
  display: flex
  justify-content: space-between
  margin-bottom: 8px
  &.header
    font-weight: bold
    margin-bottom: 26px
  & .cell
    flex: 1
</style>
