import { mount } from '@vue/test-utils';
import DragAndDrop, { classNames } from '@/plugins/DragAndDrop';
import Draggable from '@/plugins/Draggable.vue';

const DraggableStub = {
  components: { Draggable },
  template: '<Draggable dragging-class="test-dragging"><div class="test-class">drag</div></Draggable>'
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
    expect(wrapper.get('div').classes()).toContain(classNames.DRAGGABLE);
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
    await div.trigger('dragstart');
    await div.trigger('drag');
    expect(div.classes()).toContain(classNames.DRAGGING);

    await div.trigger('dragend');
    expect(div.classes()).not.toContain(classNames.DRAGGING);
  });

  it('adds and removes dragging class', async () => {
    const wrapper = setupDraggable(DraggableStub);
    const div = wrapper.get('div');
    await div.trigger('dragstart');
    await div.trigger('drag');
    expect(div.classes()).toContain('test-dragging');

    await div.trigger('dragend');
    expect(div.classes()).not.toContain('test-dragging');
  });

  it('fails when no default slot provided', () => {
    const errorCount = errors.length;
    const wrapper = setupDraggable(EmptyDraggableStub);
    expect(wrapper.element.nodeName).toBe('#comment');
    expect(errors.length).toBe(errorCount + 1);
  });
});
