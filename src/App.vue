<template>
  <DropZone dropping-class="dropping">
    <div class="workspace">
      <Draggable v-for="(column, idx) in columns" :key="idx" dragging-class="dragging">
        <DropZone dropping-class="dropping">
          <div class="column" :data-idx="idx + 1">
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
  name: 'App',
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
body {
  margin: 0;
  height: 100vh;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.workspace {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
  background: darkgrey;

  &.dropping {
    background: #42b983;
    outline: dashed black;
  }
}

.column {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  max-height: 85vh;
  gap: 20px;
  background: gray;
  padding: 10px;
  border-radius: 5px;

  &.dropping {
    background: #505050;
    outline: dashed black;
  }

  &.dragging {
    background: #505050;
    & > * {
      visibility: hidden;
    }
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
