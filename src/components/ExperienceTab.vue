<script setup lang="ts">
import type { Experience } from '~/types/Experience';

const loading = ref(false);
const finished = ref(false);
const list = ref<Experience[]>([]);

let experiences: Experience[] = [];
const perPage = 10;

const load = () => {
  setTimeout(() => {
    for (
      let i = 0;
      i < perPage && list.value.length < experiences.length;
      i++
    ) {
      list.value.push(experiences[list.value.length]);
    }

    loading.value = false;

    if (list.value.length === experiences.length) {
      finished.value = true;
    }
  }, 500);
};

onMounted(async () => {
  experiences = (await useData()).experiences;
});
</script>

<template>
  <div relative w="inherit">
    <var-list v-model:loading="loading" :finished="finished" @load="load">
      <var-card
        v-for="experience in list"
        :key="JSON.stringify(experience)"
        w="inherit"
        mx="2"
        my="4"
        shadow
        layout="row"
        :title="experience.title"
        :src="experience.imgUrl"
      >
        <template #description>
          <div whitespace-normal break-all px="2" pb="4" text-sm>
            {{ experience.info }}
          </div>
        </template>
        <template v-if="experience.link" #extra>
          <a :href="experience.link" target="_blank" text-sm>阅读全文</a>
        </template>
      </var-card>
    </var-list>
  </div>
</template>

<style scoped></style>
