import { mount } from '@vue/test-utils';
import DragAndDrop, { classNames } from '@/plugins/DragAndDrop';
import DropZone from '@/plugins/DropZone.vue';

const DropZoneStub = {
  components: { DropZone },
  template: '<DropZone><div class="test-class">drop</div></DropZone>'
};

const EmptyDropZoneStub = {
  components: { DropZone },
  template: '<DropZone></DropZone>'
};

const setupDropZone = (component: typeof DropZoneStub) =>
  mount(component, {
    global: {
      plugins: [DragAndDrop]
    }
  });

describe('DropZone.vue', () => {
  const errors: string[] = [];
  console.error = (msg) => errors.push(msg);

  it('contains class from plugin', () => {
    const wrapper = setupDropZone(DropZoneStub);
    expect(wrapper.get('div').classes()).toContain(classNames.DROP_ZONE);
  });

  it('contains class from template', () => {
    const wrapper = setupDropZone(DropZoneStub);
    expect(wrapper.get('div').classes()).toContain('test-class');
  });

  it('fails when no default slot provided', () => {
    const errorCount = errors.length;
    const wrapper = setupDropZone(EmptyDropZoneStub);
    expect(wrapper.element.nodeName).toBe('#comment');
    expect(errors.length).toBe(errorCount + 1);
  });
});
