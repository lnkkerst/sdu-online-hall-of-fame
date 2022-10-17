<script setup lang="ts">
const swipe = ref();
const images = ref([]);
onMounted(async () => {
  images.value = (await useData()).swipeImages;
});
</script>

<template>
  <div relative>
    <var-swipe v-bind="$attrs" ref="swipe">
      <template v-for="image of images" :key="image.title">
        <var-swipe-item>
          <div relative h-lg>
            <img
              absolute
              top="1/2"
              translate-y="-1/2"
              :src="image.url"
              min-h-full
              min-w-full
            />
          </div>
        </var-swipe-item>
      </template>
    </var-swipe>
    <div
      absolute
      translate-y="-1/2"
      top="50%"
      left="0"
      style="background: #00000077"
      h="36"
      w="12"
      hover:opacity-87
      active:opacity-72
      rounded-r
      @click="swipe.prev"
    >
      <div
        w-full
        absolute
        top="50%"
        translate-y="-1/2"
        text-white
        text-xl
        class="i-mdi-chevron-double-left"
      ></div>
    </div>

    <div
      absolute
      translate-y="-1/2"
      top="50%"
      right="0"
      style="background: #00000077"
      h="36"
      w="12"
      hover:opacity-87
      active:opacity-72
      rounded-l
      @click="swipe.next"
    >
      <div
        w-full
        absolute
        top="50%"
        translate-y="-1/2"
        text-white
        text-xl
        class="i-mdi-chevron-double-right"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
