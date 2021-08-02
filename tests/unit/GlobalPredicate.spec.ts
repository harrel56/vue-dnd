import { mount } from '@vue/test-utils';
import DragAndDrop, { classNames, GlobalPredicate } from '@/plugins/DragAndDrop';
import Draggable from '@/plugins/Draggable.vue';
import { defineComponent } from 'vue';
import DropZone from '@/plugins/DropZone.vue';

const ComplexStub = defineComponent({
  components: { DropZone, Draggable },
  template: ` <DropZone><div class="z1" data-idx="1">
                <Draggable><div class="d1" data-idx="1"></div></Draggable>
                <Draggable><div class="d2" data-idx="2"></div></Draggable>
                <Draggable><div class="d3" data-idx="3"></div></Draggable>
              </div></DropZone>
              <DropZone><div class="z2" data-idx="2">
                <Draggable><div class="d1" data-idx="1"></div></Draggable>
                <Draggable><div class="d2" data-idx="2"></div></Draggable>
              </div></DropZone>`
});

type ComponentType = typeof ComplexStub;

const dndGlobalPredicate: GlobalPredicate = (dropZone: Element, draggable: Element) =>
  dropZone.getAttribute('data-idx') === draggable.getAttribute('data-idx');

const setupWorkspace = (component: ComponentType) =>
  mount(component, {
    global: {
      plugins: [[DragAndDrop, dndGlobalPredicate]]
    }
  });

describe('GlobalPredicate', () => {
  it('no actions taken for different dropZone (predicate returns false)', async () => {
    const wrapper = setupWorkspace(ComplexStub);
    const dropzone2 = wrapper.get('.z2');
    const draggable1 = wrapper.get('.z1 .d1');

    await draggable1.trigger('dragstart');
    await draggable1.trigger('drag');
    await dropzone2.trigger('dragenter');
    expect(dropzone2.classes()).not.toContain(classNames.DROPPING);
    await dropzone2.trigger('drop');
    expect(dropzone2.findAll('*').length).toBe(2);
    expect(dropzone2.find(':last-child').classes()).toContain('d2');
  });

  it('no actions taken for same dropZone (predicate returns false)', async () => {
    const wrapper = setupWorkspace(ComplexStub);
    const dropzone1 = wrapper.get('.z1');
    const draggable2 = wrapper.get('.z1 .d2');
    const draggable3 = wrapper.get('.z1 .d3');

    await draggable2.trigger('dragstart');
    await draggable2.trigger('drag');

    await draggable3.trigger('dragenter');
    expect(dropzone1.find(':first-child').classes()).toContain('d1');
    expect(dropzone1.find(':nth-child(2)').classes()).toContain('d2');
    expect(dropzone1.find(':last-child').classes()).toContain('d3');

    await draggable2.trigger('drop');
    expect(dropzone1.find(':first-child').classes()).toContain('d1');
    expect(dropzone1.find(':nth-child(2)').classes()).toContain('d2');
    expect(dropzone1.find(':last-child').classes()).toContain('d3');
  });
});
