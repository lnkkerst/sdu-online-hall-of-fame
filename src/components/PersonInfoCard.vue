<script setup lang="ts">
const props = withDefaults(defineProps<{ expand: boolean }>(), {
  expand: false
});
</script>

<template>
  <div relative>
    <div relative h-0 pb="9/16">
      <div absolute top-0 left-0 bottom-0 right-0>
        <slot name="cover" />
      </div>
    </div>
    <div text-lg>
      <slot name="title" />
    </div>
    <div
      v-show="props.expand"
      relative
      overflow-auto
      transition
      easy-in-out
      duration-300
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped></style>
