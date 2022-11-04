<script setup lang="ts">
const active = ref(0);
</script>

<template>
  <var-tabs v-model:active="active">
    <var-tab>test2</var-tab>
    <div w="4/5"></div>
    <var-tab>test1</var-tab>
  </var-tabs>
  <var-tabs-items v-model:active="active" :can-swipe="false">
    <var-tab-item>
      <HonorsTab></HonorsTab>
    </var-tab-item>
    <var-tab-item></var-tab-item>
  </var-tabs-items>
</template>

<style scoped></style>
