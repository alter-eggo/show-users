<template>
  <div class="input">
    <input
      @input="$emit('onChange', $event.target.value)"
      placeholder="Filter"
    />
  </div>
</template>
