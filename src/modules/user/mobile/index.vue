<script>
/**
 * state in component instance scope
 */
import { defineComponent, inject, reactive, toRaw, getCurrentInstance, provide, onMounted } from 'vue';
import Keyboard from './keyboard/index.vue';
import {
  provide as provideExtra
} from '../../../boost/inject-extra';

export default defineComponent({
  setup(props, { attrs }) {
    console.log('attrs', toRaw(attrs));
    // const currentInstance = getCurrentInstance();
    // console.log('currentInstance', currentInstance);
    // const configs = inject('configs');
    // console.log('mobile-configs', configs);
    const mobileShare = reactive({
      name: 'MI'
    });
    provideExtra('mobile', mobileShare);
    setTimeout(() => {
      mobileShare.name = 'MI2';
    }, 2000);
    onMounted(() => {
      console.log('mounted1111111');
    });
    const mobileArgs = reactive({
      width: '100',
      engine: 'MI'
    });
    return {
      mobileArgs
    };
  },
  components: {
    Keyboard
  }
});
</script>
<template>
  <div class="mobile">Mobile engine: {{ mobileArgs.engine }}, width: {{ mobileArgs.width }}  <Keyboard /></div>
</template>
