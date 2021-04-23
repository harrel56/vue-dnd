import { App } from 'vue';

export interface DragAndDropStore {
  currentDraggable: Element | null;
  dropZoneCounter: number;
}

export interface SafeDragEvent extends Omit<DragEvent, 'target'> {
  target: Element;
}

export default (app: App): void => {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$dragAndDropStore = {
    currentDraggable: null,
    dropZoneCounter: 0
  } as DragAndDropStore;
};
