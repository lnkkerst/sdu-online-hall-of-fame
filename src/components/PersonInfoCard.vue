<script setup lang="ts">
import anime from 'animejs';
import { marked } from 'marked';
import type PerfectScrollbar from 'perfect-scrollbar';
import type { Person } from '~/types/Person';
import 'github-markdown-css/github-markdown-light.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const props = withDefaults(
  defineProps<{ person: Person; expand?: boolean }>(),
  {
    expand: false
  }
);

const info = ref<HTMLElement>();
let ps: PerfectScrollbar | undefined;

const expand = ref(props.expand);

const imagePosition = ref({
  top: '0%',
  bottom: '20%'
});
const imageNormalPosition = ref({
  top: '0%',
  bottom: '20%'
});
const imageExpandedPosition = ref({
  top: '2%',
  bottom: '70%'
});

const titlePosition = ref({
  top: '80%',
  bottom: '0%'
});
const titleNormalPosition = ref({
  top: '80%',
  bottom: '0%'
});
const titleExpandedPosition = ref({
  top: '30%',
  bottom: '60%'
});

const infoPosition = ref({
  top: '100%',
  bottom: '-100%'
});
const infoNormalPosition = ref({
  top: '100%',
  bottom: '-100%'
});
const infoExpandedPosition = ref({
  top: '40%',
  bottom: '2'
});

watch(
  () => props.expand,
  async (newVal, oldVal) => {
    if (newVal === oldVal) {
      return;
    }

    let delay = 0;
    const duration = 400;
    if (newVal) {
      expand.value = true;
      await Promise.all([
        anime({
          targets: imagePosition.value,
          ...imageExpandedPosition.value,
          delay,
          duration,
          easing: 'linear'
        }).finished,
        anime({
          targets: titlePosition.value,
          ...titleExpandedPosition.value,
          delay,
          duration,
          easing: 'linear'
        }).finished,
        anime({
          targets: infoPosition.value,
          ...infoExpandedPosition.value,
          delay,
          duration,
          easing: 'linear'
        }).finished
      ]);

      ps?.update();
    } else {
      expand.value = false;
      delay = 0;
      await Promise.all([
        anime({
          targets: imagePosition.value,
          ...imageNormalPosition.value,
          delay,
          duration,
          easing: 'linear'
        }).finished,
        anime({
          targets: titlePosition.value,
          ...titleNormalPosition.value,
          delay,
          duration,
          easing: 'linear'
        }).finished,
        anime({
          targets: infoPosition.value,
          ...infoNormalPosition.value,
          delay,
          duration,
          easing: 'linear'
        }).finished
      ]);
    }
  }
);

onMounted(() => {
  // ps = new PerfectScrollbar(info.value as HTMLElement, {});
});
</script>

<template>
  <div relative w="full" h="full" overflow="hidden" bg="white">
    <div
      :class="{ 'image-expanded': expand }"
      absolute
      left="0"
      right="0"
      :style="imagePosition"
      overflow-hidden
    >
      <img
        max-h="full"
        max-w="full"
        relative
        top="1/2"
        translate-y="-1/2"
        left="1/2"
        translate-x="-1/2"
        :src="props.person.imgUrl"
        alt=""
      />
    </div>
    <div
      text-lg
      absolute
      left="0"
      right="0"
      px="sm"
      flex
      flex-row
      items-center
      :class="{ 'name-expanded': expand }"
      :style="titlePosition"
    >
      {{ props.person.name }}
    </div>
    <div
      ref="info"
      absolute
      left="0"
      right="0"
      overflow-auto
      px="4"
      class="info-container"
      :style="infoPosition"
    >
      <div
        class="markdown-body"
        text-sm
        v-html="marked.parse(props.person.info)"
      ></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.info-container::-webkit-scrollbar {
  width: 4px;
  background-color: transparent;
}

.info-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #d8ddea;
}
</style>
