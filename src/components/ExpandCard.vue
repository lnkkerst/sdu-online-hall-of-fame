<script lang="ts" setup></script>

<template>
  <div bg="blue" class="expand"></div>
</template>

<style scoped>
.expand {
  animation-name: expand;
  animation-duration: 3s;
}

@keyframes expand {
  from {
    height: 0px;
    width: 0px;
  }
  to {
    height: 100px;
    width: 100px;
  }
}
</style>
