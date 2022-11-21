import { createApp } from 'vue';
import App from './App.vue';

import '@unocss/reset/tailwind.css';
import 'uno.css';
import '@varlet/ui/es/style.js';
import '@varlet/touch-emulator';

import './styles/main.css';

const app = createApp(App);

app.mount('#hall-of-fame');
