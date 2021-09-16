<script>
import { defineComponent, reactive } from 'vue';
import { injectAsync } from '../../../boost/inject-extra';

export default defineComponent({
  setup() {
    const mobile = reactive({
      name: 'UNKNOWN'
    });
    injectAsync('mobile').then((data) => {
      console.log('mobile', data);
      mobile.name = data.name;
    });
    return {
      mobile
    };
  }
})
</script>
<template>
<div class="car">Car from mobile: {{ mobile.name }}</div>
</template>
