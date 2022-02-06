<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="input">
    <input @input="$emit('onChange', $event.target.value)" placeholder="Filter"/>
  </div>
</template>

<style scoped></style>
