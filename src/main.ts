import { createApp } from 'vue';
import DragAndDrop, { GlobalPredicate, classNames } from '@/plugins/DragAndDrop';
import App from './App.vue';
import router from './router';

const dndGlobalPredicate: GlobalPredicate = (dropZone: Element, draggable: Element) =>
  !(dropZone.classList.contains(classNames.DROP_ZONE) && draggable.classList.contains(classNames.DROP_ZONE));

createApp(App).use(router).use(DragAndDrop, dndGlobalPredicate).mount('#app');
