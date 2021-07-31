<script lang="ts">
import { defineComponent, getCurrentInstance, Slots, Slot, h } from 'vue';
import { DragAndDropStore, SafeDragEvent, classNames } from '@/plugins/DragAndDrop';

export default defineComponent({
  name: 'Draggable',
  props: {
    draggingClass: {
      type: String,
      default: null
    }
  },
  setup(props, { slots }: { slots: Slots }) {
    if (slots.default == null) {
      console.error('Draggable component cannot be used without a default slot');
      return () => null;
    }

    const draggingClasses = props.draggingClass == null ? [classNames.DRAGGING] : [classNames.DRAGGING, props.draggingClass];
    const store = getCurrentInstance()?.appContext.config.globalProperties.$dragAndDropStore as DragAndDropStore;

    const dragStart = (e: SafeDragEvent) => {
      store.dropZoneCounter = 0;
      store.currentDraggable = e.target;
    };

    const drag = () => {
      if (store.currentDraggable) {
        store.currentDraggable.classList.add(...draggingClasses);
      }
    };

    const dragEnd = () => {
      if (store.currentDraggable) {
        store.currentDraggable.classList.remove(...draggingClasses);
        store.currentDraggable = null;
      }
    };

    const defaultSlot = slots.default as Slot;
    return () =>
      h(defaultSlot()[0], {
        class: classNames.DRAGGABLE,
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
