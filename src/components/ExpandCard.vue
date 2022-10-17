<script setup>
import { ref } from 'vue';

const floating = ref(false);
</script>

<template>
  <var-card
    v-model:floating="floating"
    title="本草纲目"
    subtitle="我表情悠哉 跳个大概"
    src="https://varlet.gitee.io/varlet-ui/cat.jpg"
    @click="floating = true"
  >
    <template #extra>
      <var-button text type="warning">操作 1</var-button>
      <var-button text type="warning">操作 2</var-button>
    </template>

    <template #content>
      <var-divider dashed />

      <div class="card-example-text">
        如果华佗再世,崇洋都被医治,外邦来学汉字,激发我民族意识。马钱子、决明子、苍耳子，还有莲子；黄药子、苦豆子、川楝子，我要面子。用我的方式，改写一部历史。没什么别的事，跟着我念几个字。山药当归枸杞
        GO，山药 当归 枸杞 GO，看我抓一把中药，服下一帖骄傲~
      </div>
    </template>
  </var-card>
</template>

<style>
.card-example-text {
  padding: 14px;
  font-size: 14px;
  line-height: 28px;
}
</style>
