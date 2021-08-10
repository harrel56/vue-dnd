<script lang="ts">
import { defineComponent, getCurrentInstance, Slots, Slot, h } from 'vue';
import { DragAndDropStore, SafeDragEvent, classNames } from '@/plugins/DragAndDrop';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

export default defineComponent({
  name: 'Draggable',
  props: {
    draggingClass: {
      type: String,
      default: null
    },
    onDragStart: {
      type: Function,
      default: noOp
    },
    onDrag: {
      type: Function,
      default: noOp
    },
    onDragEnd: {
      type: Function,
      default: noOp
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
      props.onDragStart(e.target);
    };

    const drag = (e: SafeDragEvent) => {
      if (store.currentDraggable) {
        store.currentDraggable.classList.add(...draggingClasses);
        props.onDrag(e.target);
      }
    };

    const dragEnd = (e: SafeDragEvent) => {
      if (store.currentDraggable) {
        store.currentDraggable.classList.remove(...draggingClasses);
        store.currentDraggable = null;
        props.onDragEnd(e.target);
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
}
</style>
