<script lang="ts">
import { defineComponent, getCurrentInstance, Slots, Slot, h, ref, Ref } from 'vue';
import { DragAndDropStore, SafeDragEvent, classNames } from '@/plugins/DragAndDrop';

export default defineComponent({
  name: 'DropZone',
  props: {
    droppingClass: {
      type: String,
      default: null
    }
  },
  setup(props, { slots }: { slots: Slots }) {
    if (slots.default == null) {
      console.error('DropZone component cannot be used without a default slot');
      return () => null;
    }
    const droppingClasses = props.droppingClass == null ? [classNames.DROPPING] : [classNames.DROPPING, props.droppingClass];
    const store = getCurrentInstance()?.appContext.config.globalProperties.$dragAndDropStore as DragAndDropStore;
    const selfRef = ref() as Ref<HTMLElement>;

    const shouldProcessEvent = (currentDraggable: Element | null, closestDropZone: Element): currentDraggable is Element =>
      currentDraggable != null && closestDropZone === selfRef.value && store.globalPredicate(closestDropZone, currentDraggable);

    const onDragEnter = (e: SafeDragEvent) => {
      const { currentDraggable } = store;
      const dropZone = e.target.closest(`.${classNames.DROP_ZONE}`) as Element;
      if (!shouldProcessEvent(currentDraggable, dropZone)) {
        return;
      }

      store.currentDropZone = e.target === dropZone ? null : dropZone;
      if (currentDraggable.closest(`.${classNames.DROP_ZONE}`) !== dropZone) {
        dropZone.classList.add(...droppingClasses);
      } else if (e.target !== dropZone) {
        const swapChild = e.target.closest(`.${classNames.DRAGGABLE}`)!;
        if (!swapChild || swapChild === currentDraggable) {
          return;
        }

        const children = Array.from(dropZone.children);
        if (children.indexOf(currentDraggable) > children.indexOf(swapChild)) {
          swapChild.before(currentDraggable);
        } else {
          swapChild.after(currentDraggable);
        }
      }
    };

    const onDragLeave = (e: SafeDragEvent) => {
      const { currentDraggable } = store;
      const dropZone = e.target.closest(`.${classNames.DROP_ZONE}`) as Element;
      if (!shouldProcessEvent(currentDraggable, dropZone)) {
        return;
      }

      if (e.target === dropZone && store.currentDropZone !== dropZone) {
        dropZone.classList.remove(...droppingClasses);
      }
    };

    const onDrop = (e: SafeDragEvent) => {
      const { currentDraggable } = store;
      const dropZone = e.target.closest(`.${classNames.DROP_ZONE}`) as Element;
      if (!shouldProcessEvent(currentDraggable, dropZone)) {
        return;
      }

      if (currentDraggable.closest(`.${classNames.DROP_ZONE}`) !== dropZone) {
        dropZone.append(currentDraggable);
        dropZone.classList.remove(...droppingClasses);
      }
    };

    const onDragOver = (e: SafeDragEvent) => {
      e.preventDefault();
    };

    const defaultSlot = slots.default as Slot;
    return () =>
      h(defaultSlot()[0], {
        ref: selfRef,
        class: classNames.DROP_ZONE,
        ondragenter: onDragEnter,
        ondragleave: onDragLeave,
        ondrop: onDrop,
        ondragover: onDragOver
      });
  }
});
</script>
