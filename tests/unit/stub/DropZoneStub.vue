<template>
  <DropZone><div class="test-class">drop</div></DropZone>
</template>

<script>
import { defineComponent } from 'vue';
import DropZone from '@/plugins/DropZone.vue';

export default defineComponent({
  name: 'DropZoneStub',
  components: { DropZone }
});
</script>
