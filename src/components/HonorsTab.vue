<script setup lang="ts">
// import anime from 'animejs';
import type { HallOfFameData } from '~/types/Data';
import type { Person } from '~/types/Person';

const root = ref<HTMLElement>();
const { width } = useElementSize(root);
const columns = computed(() => {
  if (width.value > 720) {
    return 5;
  } else if (width.value > 540) {
    return 3;
  } else {
    return 2;
  }
});

const swipes = ref<any[]>([]);
const swipeShow = ref(true);

const data = ref<HallOfFameData>();
const floatCardStatus = ref({
  expand: false,
  show: false,
  person: { name: '', imgUrl: '', info: '' },
  style: { top: '0', bottom: '0', left: '0', right: '0' },
  reserveStyle: { top: '0', bottom: '0', left: '0', right: '0' },
  transition: true
});

const rowTitle = ['最美辅导员', '年度提名', '年度人物'];

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

async function handleCardClick(e: PointerEvent, person: Person) {
  if (useDragging().value) {
    return;
  }
  let el: HTMLElement | null = e.target as HTMLElement;
  if (!el) {
    return;
  }
  while (!el.classList.contains('person-card')) {
    el = el.parentElement;
    if (!el) {
      return;
    }
  }

  const targetRect = el.getBoundingClientRect();
  const containerRect = root.value?.getBoundingClientRect();
  if (!containerRect) {
    return;
  }

  floatCardStatus.value.transition = false;

  floatCardStatus.value.reserveStyle = {
    top: `${(targetRect.top - containerRect.top).toString()}px`,
    bottom: `${(containerRect.bottom - targetRect.bottom).toString()}px`,
    left: `${(targetRect.left - containerRect.left).toString()}px`,
    right: `${(containerRect.right - targetRect.right).toString()}px`
  };

  floatCardStatus.value.style = JSON.parse(
    JSON.stringify(floatCardStatus.value.reserveStyle)
  );

  floatCardStatus.value.person = person;

  floatCardStatus.value.show = true;

  floatCardStatus.value.transition = true;

  setTimeout(() => {
    swipeShow.value = false;
    floatCardStatus.value.expand = true;

    // anime({
    //   targets: floatCardStatus.value.style,
    //   top: '8px',
    //   bottom: '8px',
    //   left: '8px',
    //   right: '8px',
    //   easing: 'linear',
    //   delay: 200,
    //   duration: 150
    // });

    floatCardStatus.value.style = {
      top: '8px',
      bottom: '8px',
      left: '8px',
      right: '8px'
    };
  }, 30);
}

async function handleFloatCardExit() {
  floatCardStatus.value.expand = false;
  // await anime({
  //   targets: floatCardStatus.value.style,
  //   ...floatCardStatus.value.reserveStyle,
  //   easing: 'linear',
  //   delay: 200,
  //   duration: 150
  // }).finished;
  floatCardStatus.value.style = { ...floatCardStatus.value.reserveStyle };
  swipeShow.value = true;
  setTimeout(() => (floatCardStatus.value.show = false), 300);
}

onMounted(async () => {
  data.value = await useData();
});
</script>

<template>
  <div ref="root" relative>
    <div
      v-show="floatCardStatus.show"
      absolute
      top="0"
      bottom="0"
      left="0"
      right="0"
      z="100"
      @click.prevent
    >
      <div absolute right="6" top="6" z="102">
        <var-button round type="primary" @click="handleFloatCardExit">
          <div i-mdi-keyboard-return></div>
        </var-button>
      </div>
      <div
        absolute
        :style="floatCardStatus.style"
        :class="{ 'card-transition': floatCardStatus.transition }"
      >
        <PersonInfoCard
          :expand="floatCardStatus.expand"
          :person="floatCardStatus.person"
          rounded-md
          drop-shadow-md
          class="mdc-elevation--z2"
        ></PersonInfoCard>
      </div>
    </div>
    <div
      :style="{ opacity: swipeShow ? '1' : '0' }"
      transition
      easy-in-out
      duration="300"
      flex
      flex-col
      relative
    >
      <template
        v-for="(rowValue, _rowKey, rowIndex) in data?.honors"
        :key="JSON.stringify(rowValue)"
      >
        <div relative my="4">
          <div px="4">
            <div
              px="4"
              py="1"
              bg="#9c0c13"
              skew-x="-16"
              text="white"
              inline-block
              relative
            >
              <div skew-x="16">
                {{ rowTitle[rowIndex] }}
              </div>
            </div>
          </div>
          <div relative>
            <var-swipe
              :ref="(el: any) => {swipes[rowIndex] = el}"
              :indicator="false"
              :loop="false"
              ondragstart="return false;"
            >
              <var-swipe-item
                v-for="row in assignToRows(rowValue)"
                :key="JSON.stringify(row)"
              >
                <div
                  relative
                  h-0
                  w-full
                  :style="{ 'padding-bottom': `${100 / columns}%` }"
                >
                  <div
                    absolute
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    grid
                    grid-rows-1
                    :style="{
                      'grid-template-columns': `repeat(${columns}, minmax(0, 1fr))`
                    }"
                  >
                    <div
                      v-for="person in row"
                      :key="JSON.stringify(person)"
                      w="full"
                      h="full"
                      p="3/100"
                    >
                      <PersonInfoCard
                        v-ripple
                        cursor="pointer"
                        :expand="false"
                        :person="person"
                        rounded-md
                        class="person-card mdc-elevation--z2"
                        @click="(e: PointerEvent) => handleCardClick(e, person)"
                      ></PersonInfoCard>
                    </div>
                  </div>
                </div>
              </var-swipe-item>
            </var-swipe>

            <div
              absolute
              right-0
              top="1/5"
              bottom="1/5"
              bg="#00000066"
              w="1/16"
              my-2
              rounded-l-md
              hover:opacity="86"
              active:opacity="72"
              @click="swipes[rowIndex].next()"
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
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.card-transition {
  --at-apply: transition-all duration-400;
}

.mdc-elevation--z0 {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z1 {
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z2 {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z3 {
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z4 {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z5 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z6 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z7 {
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2),
    0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z8 {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.mdc-elevation--z9 {
  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2),
    0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
}
</style>
