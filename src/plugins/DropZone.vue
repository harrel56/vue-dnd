<script lang="ts">
import { defineComponent, getCurrentInstance, Slots, Slot, h } from 'vue';
import { DragAndDropStore, SafeDragEvent } from '@/plugins/DragAndDrop';

export default defineComponent({
  name: 'DropZone',
  setup(props, { slots }: { slots: Slots }) {
    if (slots.default == null) {
      console.error('DropZone component cannot be used without a default slot');
      return () => null;
    }

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

    const onDragOver = (e: SafeDragEvent) => {
      e.preventDefault();
    };

    const defaultSlot = slots.default as Slot;
    return () =>
      h(defaultSlot()[0], {
        class: 'dnd-dropzone',
        ondragenter: onDragEnter,
        ondragleave: onDragLeave,
        ondrop: onDrop,
        ondragover: onDragOver
      });
  }
});
</script>

<style lang="scss">
.dnd-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  min-height: 85vh;
  gap: 20px;
  background: gray;
  padding: 10px;
  border-radius: 5px;

  &.dnd-dropping {
    background: #505050;
    outline: dashed black;
  }
}
</style>
