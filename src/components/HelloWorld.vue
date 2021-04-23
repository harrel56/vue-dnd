<template>
  <div class="flex">
    <DropZone>
      <div class="dropzone">
        <Draggable class="draggable-wrapper">
          <div class="draggable">
            <p>1</p>
          </div>
        </Draggable>
        <Draggable class="draggable-wrapper">
          <div class="draggable">
            <p>2</p>
          </div>
        </Draggable>
        <Draggable class="draggable-wrapper">
          <div class="draggable">
            <p>3</p>
          </div>
        </Draggable>
        <Draggable class="draggable-wrapper">
          <div class="draggable">
            <p>4</p>
          </div>
        </Draggable>
      </div>
    </DropZone>
    <DropZone>
      <div class="dropzone" />
    </DropZone>
    <DropZone>
      <div class="dropzone" />
    </DropZone>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Draggable from '@/components/Draggable.vue';
import DropZone from '@/components/DropZone.vue';

export default defineComponent({
  name: 'HelloWorld',
  components: { DropZone, Draggable },
  setup() {
    return {};
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

.draggable-wrapper {
  width: 200px;
  height: 100px;
}

.draggable {
  width: 100%;
  height: 100%;
  background: beige;
  cursor: pointer;

  &.dragging {
    background: #505050;

    & > * {
      visibility: hidden;
    }
  }
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
    border: dashed black;
  }
}
</style>
