<template>
  <div class="wrapper">
    <div class="root-wrapper" @click="c">
      <RenderItem text="根" />
    </div>
    <div><RenderItemSon /></div>
  </div>
</template>

<script>
import { ref } from 'vue';
import RenderItem from '../../components/RenderItem.vue';
import RenderItemSon from './RenderTestSon.vue';

export default {
  components: {
    RenderItem,
    RenderItemSon
  },
  setup() {
    const a = ref(true);
    const c = () => {
      a.value = !a.value;
    };
    return {
      c
    };
  }
};
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  width: 50vw;
}
.root-wrapper {
  display: flex;
  justify-content: center;
}
</style>
