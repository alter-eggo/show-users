<script setup>
import { computed } from "@vue/runtime-core";
import HistoryTableComponent from "../../components/HistoryTableComponent.vue";

const props = defineProps({
  historyEvents: Array,
});

const deletionHistoryEvents = computed(() =>
  props.historyEvents.filter((event) => event.type === "del")
);
</script>

<template>
  <div class="history">
    <HistoryTableComponent :list="deletionHistoryEvents" />
  </div>
</template>
