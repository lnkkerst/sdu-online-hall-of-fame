<script setup lang="ts">
import anime from 'animejs';
import { marked } from 'marked';
import type { Person } from '~/types/Person';
import 'github-markdown-css';

const swipe = ref();
const swipes = ref<any[]>([]);
const { width } = useElementSize(swipe);
const columns = computed(() => {
  if (width.value > 720) {
    return 5;
  } else if (width.value > 540) {
    return 3;
  } else {
    return 2;
  }
});
const data = ref({});
const show = ref(true);
const floatCardInfo = ref({
  name: '',
  imgUrl: '',
  info: ''
});
const floatCardStyle = ref({
  top: 100,
  left: 100,
  height: 100,
  width: 100
});
const floatCardContentOpacity = ref('0');
const floatCardContentShow = ref(false);
let reserveStyle = {};
const visibility = ref(true);
const opacity = ref('1');

watch(show, (newVal, oldVal) => {
  if (oldVal && !newVal) {
    anime({
      targets: opacity,
      value: '0',
      duration: 300,
      easing: 'linear'
    });
    setTimeout(() => {
      visibility.value = false;
    }, 500);
  }
  if (newVal) {
    visibility.value = true;
    opacity.value = '1.0';
  }
});

onMounted(async () => {
  data.value = (await useData()).honors;
});

function assignToRows(person: Person[]): Person[][] {
  const res: Person[][] = [];
  let cur: Person[] = [];
  for (let i = 0; i < person.length; ++i) {
    cur.push(person[i]);
    if (cur.length === columns.value) {
      res.push(cur);
      cur = [];
    }
  }
  if (cur.length) {
    res.push(cur);
  }
  return res;
}

function handleCardClick(e: PointerEvent, person: Person) {
  if (useDragging().value) {
    return;
  }
  let el = e.target as HTMLElement | null;
  while (el !== null && !el.classList.contains('var-card')) {
    el = el.parentElement;
  }
  if (el === null) {
    return;
  }

  show.value = !show.value;
  floatCardInfo.value = person;

  const containerRect = swipe.value.getBoundingClientRect();
  const targetRect = el.getBoundingClientRect();

  const top = targetRect.top - containerRect.top;
  const left = targetRect.left - containerRect.left;
  const height = targetRect.height;
  const width = targetRect.width;

  reserveStyle = {
    top,
    left,
    width,
    height
  };

  floatCardStyle.value = {
    top,
    left,
    width,
    height
  };

  anime({
    targets: floatCardStyle.value,
    top: 10,
    left: 10,
    height: containerRect.height - 20,
    width: containerRect.width - 20,
    easing: 'linear',
    duration: 300,
    delay: 200
  });

  setTimeout(() => {
    floatCardContentShow.value = true;
  }, 400);

  anime({
    targets: floatCardContentOpacity,
    value: '1.0',
    easing: 'linear',
    duration: 300,
    delay: 450
  });
}

function handleFloatCardExit() {
  floatCardContentShow.value = false;
  anime({
    targets: floatCardStyle.value,
    ...reserveStyle,
    easing: 'linear',
    duration: 300
  });

  setTimeout(() => {
    show.value = true;
  }, 500);
}
</script>

<template>
  <div relative>
    <div v-show="!show" absolute top-0 bottom-0 left-0 right-0 z-index="10">
      <PersonInfoCard
        expand
        class="var-card"
        :style="{
          top: `${floatCardStyle.top}px`,
          left: `${floatCardStyle.left}px`,
          height: `${floatCardStyle.height}px`,
          width: `${floatCardStyle.width}px`
        }"
        shadow-md
        rounded-md
      >
        <template #cover><img :src="floatCardInfo.imgUrl" /></template>
        <template #title>{{ floatCardInfo.name }}</template>
        <template #content>
          <div v-html="marked.parse(floatCardInfo.info)"></div>
        </template>
      </PersonInfoCard>
      <var-card
        hidden
        :title="floatCardInfo.name"
        :src="floatCardInfo.imgUrl"
        :style="{
          top: `${floatCardStyle.top}px`,
          left: `${floatCardStyle.left}px`,
          height: `${floatCardStyle.height}px`,
          width: `${floatCardStyle.width}px`
        }"
        absolute
        shadow-md
      >
        <template #description>
          <div
            v-show="floatCardContentShow"
            :style="{ opacity: floatCardContentOpacity }"
            overflow-auto
          >
            <div
              class="markdown-body"
              px-4
              pt-6
              v-html="marked.parse(floatCardInfo.info)"
            ></div>
          </div>
        </template>
      </var-card>
      <div absolute right="1/30" top="1/30">
        <var-button round type="primary" @click="handleFloatCardExit">
          <div i-mdi-keyboard-return></div>
        </var-button>
      </div>
    </div>
    <div
      ref="swipe"
      :style="{
        opacity,
        visibility: visibility ? 'visible' : 'hidden'
      }"
      flex
      flex-col
      relative
    >
      <template v-for="(value, _key, oIndex) in data" :key="oIndex">
        <div relative my="4">
          <var-swipe
            :ref="
              (el:any) => {
                swipes[oIndex] = el;
              }
            "
            ondragstart="return false;"
            :indicator="false"
          >
            <template v-for="row in assignToRows(value)">
              <var-swipe-item>
                <div
                  relative
                  h-0
                  w-full
                  :style="{ 'padding-bottom': `${100 / columns}%` }"
                >
                  <div
                    absolute
                    top-0
                    bottom-0
                    left-0
                    right-0
                    grid
                    grid-rows-1
                    :style="{
                      'grid-template-columns': `repeat(${columns}, minmax(0, 1fr))`
                    }"
                  >
                    <div
                      v-for="tutor in row"
                      :key="tutor.name"
                      p="3/100"
                      w-full
                      h-full
                    >
                      <var-card
                        v-ripple
                        hidden
                        h-full
                        cursor-pointer
                        :src="tutor.imgUrl"
                        :title="tutor.name"
                        class="transition ease-in-out duration-300"
                        @click="e => handleCardClick(e as PointerEvent, tutor)"
                      ></var-card>
                      <PersonInfoCard
                        v-ripple
                        shadow
                        rounded-md
                        class="transition ease-in-out duration-300 var-card"
                        h-full
                        expand
                        @click="e=>handleCardClick(e as PointerEvent, tutor)"
                      >
                        <template #cover>
                          <img
                            :src="tutor.imgUrl"
                            absolute
                            top="1/2"
                            translate-y="-1/2"
                            min-w-full
                            min-h-full
                          />
                        </template>
                        <template #title>
                          {{ tutor.name }}
                        </template>
                        <template #content>
                          {{ tutor.info }}
                        </template>
                      </PersonInfoCard>
                    </div>
                  </div>
                </div>
              </var-swipe-item>
            </template>
          </var-swipe>
          <div
            absolute
            right-0
            top-0
            bottom-0
            bg="#00000066"
            w="1/16"
            my-2
            rounded-l-md
            @click="swipes[oIndex].next()"
          >
            <div
              i-mdi-chevron-double-left
              text-6
              w-full
              absolute
              top="1/2"
              translate-y="-1/2"
              text-white
            ></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
