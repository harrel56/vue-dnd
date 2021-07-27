<template>
  <Draggable><div class="test-class">drag</div></Draggable>
</template>

<script>
import { defineComponent } from 'vue';
import Draggable from '@/plugins/Draggable.vue';

export default defineComponent({
  name: 'DraggableContainer',
  components: { Draggable }
});
</script>
