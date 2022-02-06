<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <button @click="$emit('onClick')">{{ text }}</button>
</template>
