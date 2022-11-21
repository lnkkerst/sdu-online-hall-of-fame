<script setup lang="ts">
const active = ref(0);
</script>

<template>
  <div relative z="1000">
    <var-tabs
      v-model:active="active"
      sticky
      shadow="[0_4px_4px_-4px_rgba(0,0,0,0.6)]"
    >
      <var-tab>辅导员荣誉</var-tab>
      <div w="4/5"></div>
      <var-tab>优秀工作事迹</var-tab>
    </var-tabs>
  </div>
  <div relative transition-all duration-200>
    <Transition>
      <div v-show="active === 0">
        <HonorsTab></HonorsTab>
      </div>
    </Transition>
    <Transition>
      <div v-show="active === 1">
        <ExperienceTab></ExperienceTab>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-active {
  transition: opacity 0.2s ease;
  transition-delay: 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
