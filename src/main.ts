import { createApp } from 'vue';
// import { createRouter, createWebHistory } from 'vue-router';
// import routes from 'virtual:generated-pages';
import App from './App.vue';

import '@unocss/reset/tailwind.css';
import 'uno.css';
import '@varlet/ui/es/style.js';
import '@varlet/touch-emulator';

import './styles/main.css';

const app = createApp(App);
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// });
// app.use(router);
app.mount('#hall-of-fame');