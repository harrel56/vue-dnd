import { createApp } from 'vue';
import DragAndDrop, { GlobalPredicate } from '@/plugins/DragAndDrop';
import App from './App.vue';

const dndGlobalPredicate: GlobalPredicate = (dropZone: Element, draggable: Element) =>
  !(dropZone.classList.contains('column') && draggable.classList.contains('column'));

createApp(App).use(DragAndDrop, dndGlobalPredicate).mount('#app');
