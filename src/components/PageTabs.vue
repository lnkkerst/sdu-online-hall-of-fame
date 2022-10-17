<script setup lang="ts">
const active = ref(0);
</script>

<template>
  <var-tabs v-model:active="active">
    <var-tab>test2</var-tab>
    <div w="4/5"></div>
    <var-tab>test1</var-tab>
  </var-tabs>
  <var-tabs-items v-model:active="active">
    <var-tab-item h-1000>
      <div h-10 w-10>
        <ExpandCard></ExpandCard>
      </div>
    </var-tab-item>
    <var-tab-item></var-tab-item>
  </var-tabs-items>
</template>

<style scoped></style>
