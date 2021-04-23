<template>
  <div class="dnd-dropzone" @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop" @dragover.prevent>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { DragAndDropStore, SafeDragEvent } from '@/plugins/DragAndDrop';

export default defineComponent({
  name: 'DropZone',
  setup() {
    const store = getCurrentInstance()?.appContext.config.globalProperties.$dragAndDropStore as DragAndDropStore;

    const onDragEnter = (e: SafeDragEvent) => {
      if (!store.currentDraggable) {
        return;
      }

      const dropZone = e.target.closest('.dnd-dropzone');
      if (!dropZone) {
        return;
      }

      store.dropZoneCounter++;
      if (store.currentDraggable.closest('.dnd-dropzone') !== dropZone) {
        dropZone.classList.add('dnd-dropping');
      } else if (e.target !== dropZone) {
        const children = Array.from(dropZone.children);
        console.log(e.target);
        console.log(dropZone);
        const swapChild = e.target.closest('.dnd-draggable')!;

        if (children.indexOf(store.currentDraggable) > children.indexOf(swapChild)) {
          swapChild.before(store.currentDraggable);
        } else {
          swapChild.after(store.currentDraggable);
        }
      }
    };

    const onDragLeave = (e: SafeDragEvent) => {
      if (!store.currentDraggable) {
        return;
      }

      store.dropZoneCounter--;
      const dropZone = e.target.closest('.dnd-dropzone');
      if (dropZone && store.currentDraggable.closest('.dnd-dropzone') !== dropZone && store.dropZoneCounter === 0) {
        dropZone.classList.remove('dnd-dropping');
      }
    };

    const onDrop = (e: SafeDragEvent) => {
      if (store.currentDraggable === null) {
        return;
      }

      const dropZone = e.target.closest('.dnd-dropzone');
      if (dropZone && store.currentDraggable.closest('.dnd-dropzone') !== dropZone) {
        dropZone.append(store.currentDraggable);
        dropZone.classList.remove('dnd-dropping');
      }
    };

    return {
      onDragEnter,
      onDragLeave,
      onDrop
    };
  }
});
</script>

<style>
/*.dnd-dropzone {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/
</style>
