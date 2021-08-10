<template>
  <DropZone>
    <div class="workspace">
      <Draggable v-for="(column, idx) in columns" :key="idx">
        <DropZone dropping-class="dropping">
          <div class="dropzone" :data-idx="idx + 1">
            <h2>{{ column.title }}</h2>
            <Draggable v-for="element in column.elements" :key="element" dragging-class="dragging">
              <div class="draggable" :data-idx="element">
                <p>{{ element }}</p>
              </div>
            </Draggable>
          </div>
        </DropZone>
      </Draggable>
    </div>
  </DropZone>
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
        { title: 'Zone 1', elements: [1, 2, 3, 4] },
        { title: 'Zone 2', elements: [1] },
        { title: 'Zone 3', elements: [1, 2] }
      ]
    };
  }
});
</script>

<style lang="scss">
.workspace {
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
  background: darkgrey;
  padding: 30px;
}

.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  min-height: 85vh;
  gap: 20px;
  background: gray;
  padding: 10px;
  border-radius: 5px;

  &.dropping {
    background: #505050;
    outline: dashed black;
  }
}

.draggable {
  width: 200px;
  height: 100px;
  background: beige;

  &.dragging {
    background: #505050;
    & > * {
      visibility: hidden;
    }
  }
}
</style>
