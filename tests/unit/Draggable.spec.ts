import { mount } from '@vue/test-utils';
import DragAndDrop from '@/plugins/DragAndDrop';
import DraggableStub from './stub/DraggableStub.vue';

const setupDraggable = () =>
  mount(DraggableStub, {
    global: {
      plugins: [DragAndDrop]
    }
  });

describe('Draggable.vue', () => {
  it('contains class from plugin', () => {
    const wrapper = setupDraggable();
    expect(wrapper.get('div').classes()).toContain('dnd-draggable');
  });

  it('contains draggable = true', () => {
    const wrapper = setupDraggable();
    expect(wrapper.get('div').element.draggable).toBeTruthy();
  });

  it('contains class from template', () => {
    const wrapper = setupDraggable();
    expect(wrapper.get('div').classes()).toContain('test-class');
  });

  it('adds and removes dragging class', async () => {
    const wrapper = setupDraggable();
    const div = wrapper.get('div');
    await div.trigger('dragstart', { clientX: 0, clientY: 0 });
    await div.trigger('drag', { clientX: 0, clientY: 1 });
    expect(div.classes()).toContain('dnd-dragging');

    await div.trigger('dragend', { clientX: 0, clientY: 1 });
    expect(div.classes()).not.toContain('dnd-dragging');
  });
});
