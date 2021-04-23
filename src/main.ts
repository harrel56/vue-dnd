import { createApp } from 'vue';
import DragAndDrop from '@/plugins/DragAndDrop';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(DragAndDrop).mount('#app');
