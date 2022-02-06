<script setup>
import CButton from "./CButton.vue";

defineProps({
  user: Object,
  btnText: String,
});
</script>

<template>
  <div class="list-element">
    {{ user.name }}
    <CButton @onClick="$emit('onClick')" :text="btnText" />
  </div>
</template>

<style lang="sass">
.list-element
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 1px solid rgba(152, 156, 180, 0.2)
  min-height: 40px
</style>
