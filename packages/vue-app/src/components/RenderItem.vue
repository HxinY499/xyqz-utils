<template>
  <div class="wrapper-item" :id="id" @click="refresh" :key="key" :hash="hash">
    {{ text }}
  </div>
</template>

<script>
import { ref, onUpdated, watch } from 'vue';

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    hash: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let flag = false;
    const key = ref(Date.now());
    const id = ref('');
    const refresh = () => {
      flag = true;
      key.value = Date.now();
    };
    watch(
      () => props.hash,
      () => {
        console.log('first');
        flag = true;
      }
    );
    onUpdated(() => {
      if (flag === true) {
        id.value = 'highlight';
      }
      flag = false;
      setTimeout(() => {
        if (id.value) {
          id.value = '';
        }
      }, 200);
    });
    return {
      id,
      key,
      refresh
    };
  }
};
</script>

<style scoped>
.wrapper-item {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: blanchedalmond;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}
#highlight {
  transition: all 0.3s;
  background-color: rgb(224, 132, 132);
}
</style>
