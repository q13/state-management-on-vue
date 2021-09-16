<script>
import { defineComponent, getCurrentInstance, provide } from 'vue'

export default defineComponent({
  setup() {
    provide('configs', {
      name: 'keyboard'
    });
  }
});
</script>
<template>
<div class="keyboard"></div>
</template>