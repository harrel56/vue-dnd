<script lang="ts">
import { defineComponent, getCurrentInstance, Slots, Slot, h } from 'vue';
import { DragAndDropStore, SafeDragEvent } from '@/plugins/DragAndDrop';

export default defineComponent({
  name: 'Draggable',
  setup(props, { slots }: { slots: Slots }) {
    const store = getCurrentInstance()?.appContext.config.globalProperties.$dragAndDropStore as DragAndDropStore;

    const dragStart = (e: SafeDragEvent) => {
      store.dropZoneCounter = 0;
      store.currentDraggable = e.target;
    };

    const drag = () => {
      if (store.currentDraggable) {
        store.currentDraggable.classList.add('dnd-dragging');
      }
    };

    const dragEnd = () => {
      if (store.currentDraggable) {
        store.currentDraggable.classList.remove('dnd-dragging');
        store.currentDraggable = null;
      }
    };

    const defaultSlot = slots.default as Slot;
    return () =>
      h(defaultSlot()[0], {
        class: 'dnd-draggable',
        draggable: true,
        ondragstart: dragStart,
        ondrag: drag,
        ondragend: dragEnd
      });
  }
});
</script>

<style lang="scss">
.dnd-draggable {
  cursor: pointer;
  background: beige;

  &.dnd-dragging {
    background: #505050;
    & > * {
      visibility: hidden;
    }
  }
}
</style>
