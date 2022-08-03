<template>
  <div class="wrapper" @click="c">
    <RenderItem text="孙" :hash="hash" />
    <RenderItem text="孙" />
  </div>
</template>

<script>
import { ref } from 'vue';
import RenderItem from '../../components/RenderItem.vue';

export default {
  components: {
    RenderItem
  },
  props: {
    hash: {
      type: String
    }
  },
  setup() {
    const a = ref(true);
    const c = () => {
      a.value = !a.value;
    };
    return { c };
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
}
</style>
