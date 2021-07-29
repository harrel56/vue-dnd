import { mount } from '@vue/test-utils';
import DragAndDrop from '@/plugins/DragAndDrop';
import Draggable from '@/plugins/Draggable.vue';

const DraggableStub = {
  components: { Draggable },
  template: '<Draggable><div class="test-class">drag</div></Draggable>'
};

const EmptyDraggableStub = {
  components: { Draggable },
  template: '<Draggable></Draggable>'
};

const setupDraggable = (component: typeof DraggableStub) =>
  mount(component, {
    global: {
      plugins: [DragAndDrop]
    }
  });

describe('Draggable.vue', () => {
  const errors: string[] = [];
  console.error = (msg) => errors.push(msg);

  it('contains class from plugin', () => {
    const wrapper = setupDraggable(DraggableStub);
    expect(wrapper.get('div').classes()).toContain('dnd-draggable');
  });

  it('contains draggable = true', () => {
    const wrapper = setupDraggable(DraggableStub);
    expect(wrapper.get('div').element.draggable).toBeTruthy();
  });

  it('contains class from template', () => {
    const wrapper = setupDraggable(DraggableStub);
    expect(wrapper.get('div').classes()).toContain('test-class');
  });

  it('adds and removes dragging class', async () => {
    const wrapper = setupDraggable(DraggableStub);
    const div = wrapper.get('div');
    await div.trigger('dragstart', { clientX: 0, clientY: 0 });
    await div.trigger('drag', { clientX: 0, clientY: 1 });
    expect(div.classes()).toContain('dnd-dragging');

    await div.trigger('dragend', { clientX: 0, clientY: 1 });
    expect(div.classes()).not.toContain('dnd-dragging');
  });

  it('fails when no default slot provided', () => {
    const errorCount = errors.length;
    const wrapper = setupDraggable(EmptyDraggableStub);
    expect(wrapper.element.nodeName).toBe('#comment');
    expect(errors.length).toBe(errorCount + 1);
  });
});
