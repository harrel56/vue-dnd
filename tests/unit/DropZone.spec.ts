/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils';
import DragAndDrop, { classNames } from '@/plugins/DragAndDrop';
import DropZone from '@/plugins/DropZone.vue';
import Draggable from '@/plugins/Draggable.vue';
import { defineComponent } from 'vue';

const DropZoneStub = defineComponent({
  components: { DropZone },
  template: '<DropZone><div class="test-class">drop</div></DropZone>'
});

const EmptyDropZoneStub = defineComponent({
  components: { DropZone },
  template: '<DropZone></DropZone>'
});

const ComplexStub = defineComponent({
  components: { DropZone, Draggable },
  template: ` <DropZone><div class="z1">
                <Draggable><div class="d1"></div></Draggable>
                <Draggable><div class="d2"></div></Draggable>
                <Draggable><div class="d3"></div></Draggable>
              </div></DropZone>
              <DropZone><div class="z2">
                <Draggable><div class="d1"></div></Draggable>
                <Draggable><div class="d2"></div></Draggable>
              </div></DropZone>`
});

type ComponentType = typeof DropZoneStub;

const setupDropZone = (component: ComponentType) =>
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

  it('does nothing when there is no current draggable', async () => {
    const wrapper = setupDropZone(DropZoneStub);
    const dropzone = wrapper.get('div');

    await dropzone.trigger('dragenter');
    expect(dropzone.classes()).not.toContain(classNames.DROPPING);
    await dropzone.trigger('dragover');
    expect(dropzone.classes()).not.toContain(classNames.DROPPING);
    await dropzone.trigger('drop');
    expect(dropzone.classes()).not.toContain(classNames.DROPPING);
    await dropzone.trigger('dragleave');
    expect(dropzone.classes()).not.toContain(classNames.DROPPING);
  });

  it('adds and removes dropping class', async () => {
    const wrapper = setupDropZone(ComplexStub);
    const dropzone2 = wrapper.get('.z2');
    const draggable1 = wrapper.get('.z1 .d1');

    await draggable1.trigger('dragstart');
    await draggable1.trigger('drag');
    await dropzone2.trigger('dragenter');
    expect(dropzone2.classes()).toContain(classNames.DROPPING);

    await dropzone2.trigger('dragleave');
    expect(dropzone2.classes()).not.toContain(classNames.DROPPING);
  });

  it('calculates drop position correctly', async () => {
    const wrapper = setupDropZone(ComplexStub);
    const dropzone1 = wrapper.get('.z1');
    const draggable1 = wrapper.get('.z1 .d1');
    const draggable3 = wrapper.get('.z1 .d3');

    await draggable1.trigger('dragstart');
    await draggable1.trigger('drag');

    await draggable3.trigger('dragenter');
    expect(dropzone1.find(':first-child').classes()).toContain('d2');
    expect(dropzone1.find(':nth-child(2)').classes()).toContain('d3');
    expect(dropzone1.find(':last-child').classes()).toContain('d1');
    expect(dropzone1.classes()).not.toContain(classNames.DROPPING);

    await draggable3.trigger('dragenter');
    expect(dropzone1.find(':first-child').classes()).toContain('d2');
    expect(dropzone1.find(':nth-child(2)').classes()).toContain('d1');
    expect(dropzone1.find(':last-child').classes()).toContain('d3');

    await draggable1.trigger('drop');
    expect(dropzone1.find(':nth-child(2)').classes()).toContain('d1');
  });

  it('adds dropped draggable to dropzone at the end', async () => {
    const wrapper = setupDropZone(ComplexStub);
    const dropzone2 = wrapper.get('.z2');
    const draggable1 = wrapper.get('.z1 .d1');

    await draggable1.trigger('dragstart');
    await draggable1.trigger('drag');
    await dropzone2.trigger('dragenter');
    await dropzone2.trigger('drop');
    expect(dropzone2.classes()).not.toContain(classNames.DROPPING);
    expect(dropzone2.findAll('*').length).toBe(3);
    expect(dropzone2.find(':last-child').classes()).toContain('d1');
  });
});
