import { App } from 'vue';

export interface DragAndDropStore {
  currentDraggable: Element | null;
  dropZoneCounter: number;
}

export interface SafeDragEvent extends Omit<DragEvent, 'target'> {
  target: Element;
}

export const classNames = {
  DRAGGABLE: 'dnd-draggable',
  DRAGGING: 'dnd-dragging',
  DROP_ZONE: 'dnd-dropzone',
  DROPPING: 'dnd-dropping'
};

export default (app: App): void => {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$dragAndDropStore = {
    currentDraggable: null,
    dropZoneCounter: 0
  } as DragAndDropStore;
};
