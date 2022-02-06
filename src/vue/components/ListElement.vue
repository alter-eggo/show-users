<script setup>
import ButtonComponent from "./ButtonComponent.vue";

defineProps({
  user: Object,
  btnText: String,
});
</script>

<template>
  <div class="list-element">
    {{ user.name }}
    <ButtonComponent @onClick="$emit('onClick')" :text="btnText" />
  </div>
</template>

<style scoped>
.list-element {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(152, 156, 180, 0.2);
}
</style>
