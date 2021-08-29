import { createApp } from 'vue';
import DragAndDrop, { GlobalPredicate } from '@/plugins/DragAndDrop';
import App from './App.vue';
import router from './router';

const dndGlobalPredicate: GlobalPredicate = (dropZone: Element, draggable: Element) =>
  !(dropZone.classList.contains('column') && draggable.classList.contains('column'));

createApp(App).use(router).use(DragAndDrop, dndGlobalPredicate).mount('#app');
