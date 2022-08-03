<template>
  <div>
    <div class="wrapper" @click="c">
      <RenderItem text="子" @click="handleClick" />
      <RenderItem text="子" />
    </div>
    <div class="sun-wrapper">
      <RenderItemSun :hash="id" /> <RenderItemSun />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import RenderItem from '../../components/RenderItem.vue';
import RenderItemSun from './RenderTestSun.vue';

export default {
  components: {
    RenderItem,
    RenderItemSun
  },
  setup() {
    const a = ref(true);
    const c = () => {
      a.value = !a.value;
    };
    const id = ref(Date.now());
    const handleClick = () => {
      console.log(id.value);
      id.value = Date.now();
    };
    return {
      handleClick,
      id,
      c
    };
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
}
.sun-wrapper {
  display: flex;
  justify-content: space-around;
}
.sun-wrapper div {
  flex: 1;
}
</style>
