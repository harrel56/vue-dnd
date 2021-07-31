<template>
  <div class="flex">
    <DropZone v-for="column in columns" :key="column.title" dropping-class="my-dropping">
      <div class="dropzone">
        <h2>{{ column.title }}</h2>
        <Draggable v-for="element in column.elements" :key="element" dragging-class="my-dragging">
          <div class="draggable">
            <p>{{ element }}</p>
          </div>
        </Draggable>
      </div>
    </DropZone>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Draggable from '@/plugins/Draggable.vue';
import DropZone from '@/plugins/DropZone.vue';

export default defineComponent({
  name: 'HelloWorld',
  components: { DropZone, Draggable },
  setup() {
    return {
      columns: [
        { title: 'Zone 1', elements: ['1', '2', '3', '4'] },
        { title: 'Zone 2', elements: ['1'] },
        { title: 'Zone 3', elements: ['1', '2'] }
      ]
    };
  }
});
</script>

<style lang="scss">
.flex {
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
  background: darkgrey;
  padding: 30px;
}

.draggable {
  width: 200px;
  height: 100px;
}
</style>
