<template>
  <slot class="dnd-draggable" draggable="true" @dragstart="onDragStart" @drag="onDrag" @dragend="onDragEnd"></slot>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, Slots } from 'vue';
import { DragAndDropStore, SafeDragEvent } from '@/plugins/DragAndDrop';

export default defineComponent({
  name: 'Draggable',
  setup(props, { slots }: { slots: Slots }) {
    const store = getCurrentInstance()?.appContext.config.globalProperties.$dragAndDropStore as DragAndDropStore;

    console.log(slots);

    const onDragStart = (e: SafeDragEvent) => {
      console.log('drg start');
      store.dropZoneCounter = 0;
      store.currentDraggable = e.target;
    };

    const onDrag = () => {
      if (store.currentDraggable) {
        store.currentDraggable.classList.add('dnd-dragging');
      }
    };

    const onDragEnd = () => {
      if (store.currentDraggable) {
        store.currentDraggable.classList.remove('dnd-dragging');
        store.currentDraggable = null;
      }
    };

    if (slots !== undefined && slots.default !== undefined) slots.default()[0].props.draggable = true;

    return {
      onDragStart,
      onDrag,
      onDragEnd
    };
  }
});
</script>

<style>
.dnd-draggable {
  width: 100%;
  height: 100%;
}
</style>
