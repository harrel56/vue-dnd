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
    await wrapper.get('div').trigger('dragstart', { clientX: 0, clientY: 0 });
    await wrapper.get('div').trigger('drag', { clientX: 0, clientY: 1 });
    console.log(wrapper.html());
    expect(wrapper.get('div').classes()).toContain('dnd-dragging');

    await wrapper.get('div').trigger('dragend', { clientX: 0, clientY: 1 });
    expect(wrapper.get('div').classes()).not.toContain('dnd-dragging');
  });
});
