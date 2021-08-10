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

    const onDragEnter = (e: SafeDragEvent) => {
      if (!store.currentDraggable) {
        return;
      }

      const dropZone = e.target.closest(`.${classNames.DROP_ZONE}`) as Element;
      if (dropZone !== selfRef.value || !store.globalPredicate(dropZone, store.currentDraggable)) {
        return;
      }

      console.log('dragEnter: ' + selfRef.value.className);
      store.dropZoneCounter++;
      if (store.currentDraggable.closest(`.${classNames.DROP_ZONE}`) !== dropZone) {
        dropZone.classList.add(...droppingClasses);
      } else if (e.target !== dropZone) {
        const swapChild = e.target.closest(`.${classNames.DRAGGABLE}`)!;
        if (!swapChild || swapChild === store.currentDraggable) {
          return;
        }

        const children = Array.from(dropZone.children);
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

      const dropZone = e.target.closest(`.${classNames.DROP_ZONE}`) as Element;
      if (dropZone !== selfRef.value || !store.globalPredicate(dropZone, store.currentDraggable)) {
        return;
      }

      console.log('dragLeave');
      store.dropZoneCounter--;
      if (store.currentDraggable.closest(`.${classNames.DROP_ZONE}`) !== dropZone && store.dropZoneCounter === 0) {
        dropZone.classList.remove(...droppingClasses);
      }
    };

    const onDrop = (e: SafeDragEvent) => {
      if (store.currentDraggable === null) {
        return;
      }

      const dropZone = e.target.closest(`.${classNames.DROP_ZONE}`) as Element;
      if (dropZone !== selfRef.value || !store.globalPredicate(dropZone, store.currentDraggable)) {
        return;
      }

      console.log('drop');
      if (store.currentDraggable.closest(`.${classNames.DROP_ZONE}`) !== dropZone) {
        dropZone.append(store.currentDraggable);
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
