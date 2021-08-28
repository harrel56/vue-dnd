import { App } from 'vue';

export type GlobalPredicate = (dropZone: Element, draggable: Element) => boolean;

export interface DragAndDropStore {
  currentDraggable: Element | null;
  currentDropZone: Element | null;
  globalPredicate: GlobalPredicate;
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

export default (app: App, globalPredicate = (() => true) as GlobalPredicate): void => {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$dragAndDropStore = {
    currentDraggable: null,
    currentDropZone: null,
    globalPredicate
  } as DragAndDropStore;
};
