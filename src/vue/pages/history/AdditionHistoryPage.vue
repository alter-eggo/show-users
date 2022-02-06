<script setup>
import { computed } from "vue";
import HistoryTableComponent from "../../components/HistoryTableComponent.vue";

const props = defineProps({
  historyEvents: Array,
});

const additionHistoryEvents = computed(() =>
  props.historyEvents.filter((event) => event.type === "add")
);
</script>

<template>
  <div class="history">
    <HistoryTableComponent :list="additionHistoryEvents" />
  </div>
</template>

<style scoped></style>
