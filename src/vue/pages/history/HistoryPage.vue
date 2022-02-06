<script setup>
import { ref } from "vue";
import HistoryTableComponent from "../../components/HistoryTableComponent.vue";

defineProps({
  historyEvents: Array,
});

const header = ["type", "id", "name", "date"];
</script>

<template>
  <div class="history">
    <HistoryTableComponent :list="historyEvents" />
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
