import { mount } from '@vue/test-utils';
import DragAndDrop from '@/plugins/DragAndDrop';
import DropZoneStub from './stub/DropZoneStub.vue';

const setupDropZone = () =>
  mount(DropZoneStub, {
    global: {
      plugins: [DragAndDrop]
    }
  });

describe('DropZone.vue', () => {
  it('contains class from plugin', () => {
    const wrapper = setupDropZone();
    expect(wrapper.get('div').classes()).toContain('dnd-dropzone');
  });

  it('contains class from template', () => {
    const wrapper = setupDropZone();
    expect(wrapper.get('div').classes()).toContain('test-class');
  });
});
